import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Game } from "src/app/shared/client/game.model";
import { GameMockClient } from "src/app/shared/client/game-mock.client";

@Component({
	selector: "app-games",
	templateUrl: "./games.component.html",
	styleUrls: ["./games.component.scss"],
})
export class GamesComponent implements OnInit {
	gamesData: Game[] = [];
	originalGamesData: Game[] = [];
	tags: string[] = [];
	providers: string[] = [];
	searchFilters: FormGroup = new FormGroup({
		providersData: new FormControl(),
		search: new FormControl(),
	});
	queryParams: Params = {
		searchTerm: "",
		provider: "",
	};
	constructor(
		gameMockClient: GameMockClient,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {
		gameMockClient.getData();
		gameMockClient.dataSubject.subscribe((next: Game[]) => {
			this.gamesData = [...next];
			this.originalGamesData = [...next];
			this.providers = [...new Set(next.map(item => item.providerName))];
			if (next.length > 0) {
				this.applyFilterChangesToData();
			}
		});
	}

	ngOnInit(): void {
		this.activatedRoute.queryParams.subscribe(params => {
			const searchTerm = params.searchTerm ? params.searchTerm : "";
			const provider = params.provider ? params.provider : "";
			const data = {
				search: searchTerm,
				providersData: provider ? params.provider.split(",") : [],
			};
			this.queryParams = {
				searchTerm,
				provider,
			};
			this.searchFilters.patchValue(data);
			if (this.originalGamesData.length > 0) {
				this.applyFilterChangesToData();
			}
		});
		this.searchFilters
			.get("search")
			?.valueChanges.pipe(debounceTime(500))
			.subscribe((text: string) => {
				this.applyFilterChangesToRoute("searchTerm", text);
			});
		this.searchFilters
			.get("providersData")
			?.valueChanges.subscribe((data: string[]) => {
				this.applyFilterChangesToRoute("provider", data);
			});
	}

	applyFilterChangesToRoute(param: string, value: string | string[]) {
		let data = "";
		if (Array.isArray(value)) {
			data = value.join();
		} else {
			data = value;
		}
		this.queryParams[param] = data;
		this.router.navigate([], {
			relativeTo: this.activatedRoute,
			queryParams: this.queryParams,
			queryParamsHandling: "merge",
		});
	}
	applyFilterChangesToData() {
		let gamesData: Game[] = [...this.originalGamesData];
		for (const key in this.queryParams) {
			if (key === "provider") {
				gamesData = gamesData.filter(game => {
					if (this.queryParams[key].length === 0) {
						return true;
					} else {
						return this.queryParams[key].indexOf(game.providerName) > -1;
					}
				});
			} else {
				gamesData = gamesData.filter(game => {
					if (!this.queryParams[key]) {
						return true;
					} else {
						return game.title
							.toLowerCase()
							.includes(this.queryParams[key].toLowerCase());
					}
				});
			}
		}
		this.gamesData = gamesData;
	}
}
