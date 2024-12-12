const Joi = require('joi');
const { questionSchema } = require("./question.model");

const roomSchema = Joi.object({
    text: Joi.string().max(64).min(2),
    questions: Joi.array().items(questionSchema).min(1).max(256),
    settings: Joi.array()
});

module.exports = {
    roomSchema
}