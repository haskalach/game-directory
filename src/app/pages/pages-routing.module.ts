import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GameComponent } from "./game/game.component";
import { GamesComponent } from "./games/games.component";

import { HomeComponent } from "./home/home.component";

const ROUTES: Routes = [
	{ path: "", component: HomeComponent },
	{ path: "games", component: GamesComponent },
	{ path: "game/:id", component: GameComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(ROUTES)],
	exports: [RouterModule],
})
export class AppPagesRoutingModule {}
