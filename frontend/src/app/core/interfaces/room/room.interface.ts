import { IQuestion } from "../question/question.interface";

export interface IRoom {
    id: string;
    name:string;
    questions: IQuestion[],
    settings: any[],
    pin: number; // 9 digits
    players_count: number;
    max_players: number;
    creation_timestamp: number; //seconds
}