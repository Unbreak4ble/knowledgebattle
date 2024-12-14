
export enum RequestCommandTypes {
    START,
    STOP,
    KICK_ALL,
    KICK,
    UPDATE_RULE,
    UPDATE_PIN,
    NEW_QUESTION,
    ANSWER,
};

export enum ResponseCommandTypes {
    START,
    STOP,
    KICK,
    UPDATE_RULE,
    UPDATE_PIN,
    NEW_QUESTION,
    RECOGNITION,
    REQUEST_FAILED,
    QUESTION,
};