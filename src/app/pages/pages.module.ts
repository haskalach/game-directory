import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { HomeComponent } from "./home/home.component";

import { AppPagesRoutingModule } from "./pages-routing.module";
import { GamesComponent } from "./games/games.component";
import { GamesDataModule } from "../components/games-data/games-data.module";
import { GameComponent } from "./game/game.component";

import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";

const COMPONENTS = [HomeComponent, GamesComponent];

@NgModule({
	imports: [
		CommonModule,
		AppPagesRoutingModule,
		BrowserAnimationsModule,
		BsDropdownModule,
		GamesDataModule,
		MatSelectModule,
		MatInputModule,
		ReactiveFormsModule,
	],
	declarations: [...COMPONENTS, GameComponent],
	exports: [...COMPONENTS],
})
export class AppPagesModule {}
