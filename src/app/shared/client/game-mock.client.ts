import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Game } from "./game.model";

@Injectable({
	providedIn: "root",
})
export class GameMockClient {

	dataSubject = new BehaviorSubject<Game[]>([]);
	latestViewedGamesSubject = new BehaviorSubject<string[]>([]);
	dataRetrived = false;
	private readonly dataURL = "assets/game.mock-data.json";
	constructor(private http: HttpClient) { }

	getAll$(): Observable<Game[]> {
		return this.http.get<Game[]>(this.dataURL);
	}

	getData(): void {
		if (!this.dataRetrived) {
			this.getAll$().subscribe((next: Game[]) => {
				this.dataRetrived = true;
				this.dataSubject.next(next);
			});
		}
	}
	addToLatestViewedGames(gameId: string): void {
		const currentGames = this.getLatestGamesFromLocalStorage();
		const index = currentGames.indexOf(gameId, 0);
		if (currentGames.length > 4) {
			if (index > -1) {
				currentGames.splice(index, 1);
			} else {
				currentGames.pop();
			}
		}
		currentGames.unshift(gameId);
		localStorage.setItem("latestGames", currentGames.join());
		this.latestViewedGamesSubject.next(currentGames);
	}

	getLatestViewedGames(): void {
		this.latestViewedGamesSubject.next(this.getLatestGamesFromLocalStorage());
	}
	getLatestGamesFromLocalStorage(): string[] {
		return localStorage.getItem("latestGames")?.split(",") ?? [];
	}
}
