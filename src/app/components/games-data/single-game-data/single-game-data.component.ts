import { Component, Input, OnInit } from "@angular/core";
import { Game } from "src/app/shared";

@Component({
	selector: "app-single-game-data",
	templateUrl: "./single-game-data.component.html",
	styleUrls: ["./single-game-data.component.scss"],
})
export class SingleGameDataComponent implements OnInit {
	@Input() data: Game = new Game();
	@Input() showPlayBtn: boolean = false;
	@Input() showGoToPageBtn: boolean = false;

	constructor() {}

	ngOnInit(): void {}
}
