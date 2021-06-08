const express = require('express');
const router = express.Router();
const controller = require('./resources/controller')

router.get('/login', controller.renderForm);
router.post('/login', controller.login);
//Get Auth
// This method will be called by Rocket.chat to fetch the login token
router.get('/rocket_chat_auth_get', controller.getAuth);
//Get Iframe
// This method will be called by Rocket.chat to fetch the login token
// and is used as a fallback
router.get('/rocket_chat_iframe', controller.getIframe)
    //Login
router.post('/login', controller.login);

module.exports = router;