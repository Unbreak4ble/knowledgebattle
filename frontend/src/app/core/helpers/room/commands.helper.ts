import { RequestCommandTypes, ResponseCommandTypes } from "../../interfaces/room/commands.interface";


export function convertRequestToString(command: RequestCommandTypes): string|null {
    const commands:any = {
        [RequestCommandTypes.START]: 'start',
        [RequestCommandTypes.STOP]: 'stop',
        [RequestCommandTypes.KICK]: 'kick',
        [RequestCommandTypes.KICK_ALL]: 'kick_all',
        [RequestCommandTypes.UPDATE_RULE]: 'update_rule',
        [RequestCommandTypes.UPDATE_PIN]: 'update_pin',
        [RequestCommandTypes.NEW_QUESTION]: 'new_question',
        [RequestCommandTypes.ANSWER]: 'answer_question',
        [RequestCommandTypes.NEXT_QUESTION]: 'next_question',
        [RequestCommandTypes.RESTART_QUESTIONS]: 'restart_questions',
        [RequestCommandTypes.RESET_QUESTIONS]: 'reset_questions',
    };

    return commands[command];
}


export function convertResponseToString(command: ResponseCommandTypes): string|null {
    const commands:any = {
        [ResponseCommandTypes.START]: 'start',
        [ResponseCommandTypes.STOP]: 'stop',
        [ResponseCommandTypes.KICK]: 'kick',
        [ResponseCommandTypes.UPDATE_RULE]: 'update_rule',
        [ResponseCommandTypes.UPDATE_PIN]: 'update_pin',
        [ResponseCommandTypes.NEW_QUESTION]: 'new_question',
        [ResponseCommandTypes.REQUEST_FAILED]: 'request_failed',
        [ResponseCommandTypes.QUESTION]: 'question',
    };

    return commands[command];
}