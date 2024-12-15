import { convertRequestToString } from "../../helpers/room/commands.helper";
import { IQuestion } from "../../interfaces/question/question.interface";
import { RequestCommandTypes } from "../../interfaces/room/commands.interface";
import { RoomService } from "./room.service";


export class RoomCommands {
    _cmd_ws:WebSocket|null = null;

    constructor(){ }

    setupCommands(ws:WebSocket){
        this._cmd_ws = ws;
    }

    private sendRawCommand(type:string, data:any){
        if(!this._cmd_ws) return;

        this._cmd_ws.send(JSON.stringify({type: type, data: data}));
    }
    
    private sendCommand(command:RequestCommandTypes, data:any=null){
        const cmd_str = convertRequestToString(command);

        if(!cmd_str) return;

        this.sendRawCommand(cmd_str, data);
    }

    sendStart(){
        this.sendCommand(RequestCommandTypes.START);
    }

    sendStop(){
        this.sendCommand(RequestCommandTypes.STOP);
    }

    sendKickAll(){
        this.sendCommand(RequestCommandTypes.KICK_ALL);
    }

    sendUpdateRule(data:any){
        this.sendCommand(RequestCommandTypes.UPDATE_RULE, data);
    }

    sendUpdatePin(){
        this.sendCommand(RequestCommandTypes.UPDATE_PIN);
    }

    sendNewQuestion(questions:IQuestion[]){
        const data = {
            questions: questions
        };
        
        this.sendCommand(RequestCommandTypes.NEW_QUESTION, data);
    }

    sendAnswer(alternative_id:number){
        const data = {
            alternative_id: alternative_id
        };

        this.sendCommand(RequestCommandTypes.ANSWER, data);
    }

    sendNextQuestion(){
        this.sendCommand(RequestCommandTypes.NEXT_QUESTION);
    }

    sendResetQuestions(){
        this.sendCommand(RequestCommandTypes.RESET_QUESTIONS);
    }
}