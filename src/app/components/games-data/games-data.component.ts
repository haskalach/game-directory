import { Component, Input, OnInit } from "@angular/core";
import { Game } from "src/app/shared/client/game.model";

@Component({
	selector: "app-games-data",
	templateUrl: "./games-data.component.html",
	styleUrls: ["./games-data.component.scss"],
})
export class GamesDataComponent implements OnInit {
	@Input() gamesData: Game[] = [];
	@Input() customCssClass: string = "";
	constructor() {}

	ngOnInit(): void {}
}
