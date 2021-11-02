import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { AppPagesModule } from "./pages/pages.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { GamesDataModule } from "./components/games-data/games-data.module";

@NgModule({
	declarations: [AppComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule,
		BrowserModule,
		AppPagesModule,
		BrowserAnimationsModule,
		BsDropdownModule.forRoot(),
		CollapseModule.forRoot(),
		GamesDataModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
