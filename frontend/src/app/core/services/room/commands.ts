import { convertToString } from "../../helpers/room/commands.helper";
import { CommandTypes } from "../../interfaces/room/commands.interface";
import { RoomService } from "./room.service";


export class RoomCommands {
    _cmd_ws:WebSocket|null = null;

    constructor(){ }

    setupCommands(ws:WebSocket){
        this._cmd_ws = ws;
    }

    sendRawCommand(type:string, data:any){
        if(!this._cmd_ws) return;

        this._cmd_ws.send(JSON.stringify({type: type, data: data}));
    }
    
    sendCommand(command:CommandTypes, data:any=null){
        const cmd_str = convertToString(command);

        if(!cmd_str) return;

        this.sendRawCommand(cmd_str, data);
    }

    sendStart(){
        this.sendCommand(CommandTypes.START);
    }
}