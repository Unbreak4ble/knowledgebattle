import { IQuestion } from "../../../core/interfaces/question/question.interface";


export const questions:IQuestion[] = [
    {
        id: 1,
        text: "guess the number",
        alternatives: [
            {
                text: "1"
            },
            {
                text: "3"
            },
            {
                text: "2"
            },
            {
                text: "4"
            },
            {
                text: "0"
            },
        ]
    },
    {
        id: 2,
        text: "guess the letter",
        alternatives: [
            {
                text: "a"
            },
            {
                text: "b"
            },
            {
                text: "c"
            },
            {
                text: "d"
            },
            {
                text: "e"
            },
        ]
    },
    {
        id: 3,
        text: "guess the symbol",
        alternatives: [
            {
                text: "#"
            },
            {
                text: "$"
            },
            {
                text: "%"
            },
            {
                text: "@"
            },
            {
                text: "0"
            },
        ]
    },
]