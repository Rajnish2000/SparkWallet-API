import Joi from "joi";

const registerUserSchemaValidators = Joi.object({
    username:Joi.string().alphanum().min(5).max(15).required()
});