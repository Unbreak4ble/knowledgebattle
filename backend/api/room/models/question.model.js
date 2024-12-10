const Joi = require('joi');

const questionSchema = Joi.object({
    id: Joi.number(),
    text: Joi.string(),
    alternatives: Joi.array().items(Joi.object({
        text: Joi.string().min(1)
    })),
    finished: Joi.boolean()
});

module.exports = {
    questionSchema
}