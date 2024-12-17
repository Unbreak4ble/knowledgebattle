const Joi = require('joi');
const { questionSchema } = require("./question.model");
const { settingSchema } = require('./setting.model');

const reg_name = /^[a-zA-Z]+$/;

const roomSchema = Joi.object({
    text: Joi.string().max(32).min(2).regex(reg_name).required(),
    questions: Joi.array().items(questionSchema).min(1).max(256),
    settings: Joi.array().items(settingSchema).max(16)
});

module.exports = {
    roomSchema
}