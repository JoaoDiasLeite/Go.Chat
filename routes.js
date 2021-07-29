const express = require('express');
const router = express.Router();
const controller = require('./resources/controller')
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./docs/swagger/swagger.json')

//Login

router.get('/api', controller.checkIfLoggedIn, controller.loginAPI);
//router.get('/login', controller.renderForm);
router.get('/login', controller.checkIfLoggedIn, controller.cache);
//Get Auth
// This method will be called by Rocket.chat to fetch the login token
router.get('/rocket_chat_auth', controller.getAuth);
//Get Iframe
// This method will be called by Rocket.chat to fetch the login token
// and is used as a fallback
router.get('/rocket_chat_iframe', controller.getIframe)

//Swagger
router.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);
module.exports = router;