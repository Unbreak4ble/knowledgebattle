

// if the pipeline function returns false, then the pipeline is gone and gonna return false;
function pipelineValidate(input, pipelines){
    if(!Array.isArray(pipelines)) return false;

    let _pipelines = [...pipelines];

    for(const f of _pipelines){
        if(f(input) == false) return false;
    }

    return true;
}

module.exports = {
    pipelineValidate
}