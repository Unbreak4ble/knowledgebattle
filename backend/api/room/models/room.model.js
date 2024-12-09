const Joi = require('joi');
const { questionSchema } = require("./question.model");

const roomSchema = Joi.object({
    text: Joi.string().max(64).min(2),
    questions: Joi.array().items(questionSchema),
    settings: Joi.array()
});

module.exports = {
    roomSchema
}