import { ChangeDetectorRef, Component } from "@angular/core";
import { GameMockClient } from "./shared/client/game-mock.client";
import { Game } from "./shared/client/game.model";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	status: boolean = false;
	gamesData: Game[] = [];
	LatestViewedGames: Game[] = [];
	latestGamesIds: string[] = [];
	constructor(gameMockClient: GameMockClient, public ck: ChangeDetectorRef) {
		gameMockClient.getLatestViewedGames();
		gameMockClient.dataSubject.subscribe((next: Game[]) => {
			this.gamesData = next;
			this.getLatestGames();
		});
		gameMockClient.latestViewedGamesSubject.subscribe((next) => {
			this.latestGamesIds = next;
			this.getLatestGames();
		});
	}
	clickEvent() {
		this.status = !this.status;
	}
	getLatestGames() {
		if (this.latestGamesIds.length > 0 && this.gamesData.length > 0) {
			this.LatestViewedGames = this.gamesData.filter((x: Game) => {
				return (
					this.latestGamesIds.findIndex(
						(id) => id.toLocaleLowerCase() === x.id.toLocaleLowerCase()
					) > -1
				);
			});

			this.LatestViewedGames.sort((a, b) => {
				return (
					this.latestGamesIds.indexOf(a.id) - this.latestGamesIds.indexOf(b.id)
				);
			});
			this.ck.detectChanges();
		}
	}
}
