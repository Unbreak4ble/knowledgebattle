
export enum RequestCommandTypes {
    START,
    STOP,
    KICK_ALL,
    KICK,
    UPDATE_RULES,
    NEW_QUESTION,
};

export enum ResponseCommandTypes {
    START,
    STOP,
    KICK,
    UPDATE_RULES,
    NEW_QUESTION,
    RECOGNITION,
    REQUEST_FAILED,
};