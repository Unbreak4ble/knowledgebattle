const Joi = require("joi");

const options = [
    "ingame.visibility.result_poll",
    "privacy.public", 
    "ingame.time.wait_for_all",
    "ingame.allow_join",
    "ingame.show_previous",
];

const settingSchema = Joi.object({
    id: Joi.string().valid(...options),
    allow: Joi.boolean()
});

module.exports = {
    settingSchema
}