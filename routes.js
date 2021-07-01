const express = require('express');
const router = express.Router();
const controller = require('./resources/controller')
router.get('/api', controller.login);
router.get('/login', controller.renderForm);
router.post('/login', controller.cache);
//Get Auth
// This method will be called by Rocket.chat to fetch the login token
router.get('/rocket_chat_auth', controller.getAuth);
//Get Iframe
// This method will be called by Rocket.chat to fetch the login token
// and is used as a fallback
router.get('/rocket_chat_iframe', controller.getIframe)
    //Login


module.exports = router;