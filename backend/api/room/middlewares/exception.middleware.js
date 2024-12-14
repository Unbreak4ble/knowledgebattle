
async function handleExceptionMiddleware(req, res, next){
    try{
        next();
    }catch(err){
        console.error(err);
        res.status(500).send('internal error');
    }
}

module.exports = {
    handleExceptionMiddleware
}