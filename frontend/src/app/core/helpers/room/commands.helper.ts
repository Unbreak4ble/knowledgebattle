import { CommandTypes } from "../../interfaces/room/commands.interface";


export function convertToString(command: CommandTypes): string|null {
    const commands:any = {
        [CommandTypes.START]: 'start',
        [CommandTypes.STOP]: 'stop',
        [CommandTypes.UPDATE_RULES]: 'update_rules',
        [CommandTypes.NEW_QUESTION]: 'new_question',
    };

    return commands[command];
}