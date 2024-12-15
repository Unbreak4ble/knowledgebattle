
export enum RequestCommandTypes {
    START, // star command
    STOP, // stop command
    KICK_ALL, // kick all command
    KICK, // kick command
    UPDATE_RULE, // update rule/option command
    UPDATE_PIN, // update pin command
    NEW_QUESTION, // add new question command
    ANSWER, // answer question command
    NEXT_QUESTION, // go to next question command
    RESET_QUESTIONS, // reset questions live data
};

export enum ResponseCommandTypes {
    START, // room started
    STOP, // room stopped
    KICK, // received kick
    UPDATE_RULE, // rule updated
    UPDATE_PIN, // pin updated
    NEW_QUESTION, // new question added
    RECOGNITION, // recogized
    REQUEST_FAILED, // request failed
    QUESTION, // current question data
    QUESTION_UPDATE, // current question update. Available only for admins
    QUESTION_RESULT, // current question result
    ROOM_FINISHED, // triggered when all questions were finished
};