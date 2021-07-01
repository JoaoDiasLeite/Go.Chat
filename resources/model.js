const Joi = require('joi')
const schema = Joi.object({
    // name: Joi.string().required(),
    username: Joi.string().required(),
    // email: Joi.string().required(),
    password: Joi.string().required()

});
module.exports.schema = schema;