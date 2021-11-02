import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GamesDataComponent } from "./games-data.component";
import { SingleGameDataComponent } from "./single-game-data/single-game-data.component";
import { RouterModule } from "@angular/router";

@NgModule({
	declarations: [GamesDataComponent, SingleGameDataComponent],
	exports: [GamesDataComponent, SingleGameDataComponent],
	imports: [CommonModule, RouterModule],
})
export class GamesDataModule {}
