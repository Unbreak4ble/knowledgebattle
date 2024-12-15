const { pipelineValidate } = require("../utils/pipeline_validator");


function validateUsername(username){
    const pipelines = [
        (data) => {
            return data != null;
        },
        (data) => {
            return data.length > 0 && data.length < 32;
        },
        (data) => {
            return /^[a-zA-Z]+$/gim.test(data);
        }
    ];

    return pipelineValidate(username, pipelines);
}

module.exports = {
    validateUsername
}