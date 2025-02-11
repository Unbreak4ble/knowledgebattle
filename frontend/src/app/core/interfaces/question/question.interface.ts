import { IAlternative } from "./alternative.interface";

export interface IQuestion {
    id: number;
    text: string;
    alternatives: IAlternative[];
    correct: number;
    finished:boolean;
}