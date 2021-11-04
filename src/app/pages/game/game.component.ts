import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GameMockClient } from "src/app/shared/client/game-mock.client";
import { Game } from "src/app/shared/client/game.model";

@Component({
	selector: "app-game",
	templateUrl: "./game.component.html",
	styleUrls: ["./game.component.scss"],
})
export class GameComponent implements OnInit {
	gameData: Game = new Game();
	gameId = "";
	constructor(
		public gameMockClient: GameMockClient,
		private route: ActivatedRoute
	) {
		this.route.params.subscribe(params => {
			this.gameId = params.id;
		});
	}

	ngOnInit(): void {
		this.gameMockClient.getData();
		this.gameMockClient.addToLatestViewedGames(this.gameId);
		this.gameMockClient.dataSubject.subscribe((next: Game[]) => {
			this.gameData = next.find(game => game.id === this.gameId) || new Game();
		});
	}
}
