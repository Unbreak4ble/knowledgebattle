const { questionSchema } = require("../models/question.model")


function validateQuestionsRequest(questions){
    for(const question of questions){
        if(questionSchema.validate(question).error)
            return false;
    }

    return true;
}

function validateRoomOptions(room){
    return true;
}

module.exports = {
    validateQuestionsRequest,
    validateRoomOptions
}