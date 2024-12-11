import { RequestCommandTypes } from "../../interfaces/room/commands.interface";


export function convertRequestToString(command: RequestCommandTypes): string|null {
    const commands:any = {
        [RequestCommandTypes.START]: 'start',
        [RequestCommandTypes.STOP]: 'stop',
        [RequestCommandTypes.UPDATE_RULES]: 'update_rules',
        [RequestCommandTypes.NEW_QUESTION]: 'new_question',
    };

    return commands[command];
}