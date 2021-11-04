import { Component } from "@angular/core";
import { GameMockClient } from "src/app/shared/client/game-mock.client";
import { Game, Tags } from "src/app/shared/client/game.model";

@Component({
	templateUrl: "./home.component.html",
	selector: "app-home",
})
export class HomeComponent {
	gamesData: Game[] = [];

	constructor(gameMockClient: GameMockClient) {
		gameMockClient.getData();
		gameMockClient.dataSubject.subscribe((next: Game[]) => {
			this.gamesData = [...next.filter(x => x.tag === Tags.trending)];
		});
	}
}
