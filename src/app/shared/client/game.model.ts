export interface Game {
	id: string;
	slug: string;
	title: string;
	tag: string;
	providerName: string;
	startUrl: string;
	thumb: Thumb;
}
export interface Thumb {
	url: string;
	title: string;
}
export class Game implements Game {
}
export enum Tags {
	trending = "trending",
	hot = "hot",
}
