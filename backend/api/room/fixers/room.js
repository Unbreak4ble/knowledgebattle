
function fixQuestionsAlternativesId(alternatives){
    for(let i=0; i<alternatives.length; i++){
        alternatives[i].id = i+1;
    }

    return alternatives;
}

function fixQuestionsIds(questions){
    for(let i=0; i<questions.length; i++){
        questions[i].id = i+1;
        questions[i].alternatives = fixQuestionsAlternativesId(questions[i].alternatives);
    }

    return questions;
}

module.exports = {
    fixQuestionsIds
}