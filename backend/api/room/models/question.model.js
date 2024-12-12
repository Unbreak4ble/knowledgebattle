const Joi = require('joi');

const questionSchema = Joi.object({
    id: Joi.number(),
    text: Joi.string().min(2).max(4096),
    alternatives: Joi.array().items(Joi.object({
        text: Joi.string().min(2).max(2048)
    })).min(1).max(32),
    finished: Joi.boolean()
});

module.exports = {
    questionSchema
}