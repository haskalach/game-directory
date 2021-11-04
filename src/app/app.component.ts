import { ChangeDetectorRef, Component } from "@angular/core";
import { GameMockClient } from "./shared/client/game-mock.client";
import { Game } from "./shared/client/game.model";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	status = false;
	gamesData: Game[] = [];
	latestViewedGames: Game[] = [];
	latestGamesIds: string[] = [];
	constructor(gameMockClient: GameMockClient, public ck: ChangeDetectorRef) {
		gameMockClient.getLatestViewedGames();
		gameMockClient.dataSubject.subscribe((next: Game[]) => {
			this.gamesData = next;
			this.getLatestGames();
		});
		gameMockClient.latestViewedGamesSubject.subscribe(next => {
			this.latestGamesIds = next;
			this.getLatestGames();
		});
	}
	clickEvent() {
		this.status = !this.status;
	}
	getLatestGames() {
		if (this.latestGamesIds.length > 0 && this.gamesData.length > 0) {
			this.latestViewedGames = this.gamesData.filter(
				(x: Game) =>
					this.latestGamesIds.findIndex(
						id => id.toLocaleLowerCase() === x.id.toLocaleLowerCase()
					) > -1
			);

			this.latestViewedGames.sort(
				(a, b) =>
					this.latestGamesIds.indexOf(a.id) - this.latestGamesIds.indexOf(b.id)
			);
			this.ck.detectChanges();
		}
	}
}
