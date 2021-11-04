import { Component, Input, OnInit } from "@angular/core";
import { Game } from "src/app/shared/client/game.model";

@Component({
	selector: "app-games-data",
	templateUrl: "./games-data.component.html"
})
export class GamesDataComponent {
	@Input() gamesData: Game[] = [];
	@Input() customCssClass = "";

}
