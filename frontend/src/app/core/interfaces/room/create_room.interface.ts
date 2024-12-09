import { IQuestion } from "../question/question.interface";

export interface ICreateRoom {
    text:string;
    settings: {
        id: string;
        allow:boolean;
    }[];
    questions: IQuestion[];
}