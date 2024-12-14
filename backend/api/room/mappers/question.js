

async function hideProperties(question){
    if(question == null) return null;

    question.correct = undefined;

    return question;
}

module.exports = {
    hideProperties
}