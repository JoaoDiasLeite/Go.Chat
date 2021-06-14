const method = require('./methods');
var express = require('express');
var session = require('express-session')
const model = require('./model')

async function getToken(req, res, next) {

}



async function login(req, res, next) {
    let validateParams = '';
    try {
        validateParams = await model.schema.validateAsync(req.body);

    } catch (error) {
        return next(error);
    }
    const username = validateParams.username;
    const password = validateParams.password;
    const email = validateParams.email;
    const firstName = validateParams.name;
    // ....CODE TO LOGIN USER
    try {
        const userOk = await method.checkUser(username, password, next);
        // add your own app logic here to validate user session (check cookies, headers, etc)
        // Creating or login user into Rocket chat 
        try {
            const response = await method.createOrLoginUser(username, firstName, email, password, next);
            req.session.user = validateParams;
            // Saving the rocket.chat auth token and userId in the database
            req.session.user.rocketchatAuthToken = response.data.data.authToken;
            req.session.user.rocketchatUserId = response.data.data.userId;
            //await user.save();
            //res.send({ message: 'Login Successful' }); //Uncomment to use as API request
            res.redirect('/rocket_chat_iframe'); //Use with browser
        } catch (ex) {
            console.log('Rocket.chat login failed');

        }
    } catch (error) {
        console.log('User not found in External Service')
    }
}
/**
 * This method will be called by Rocket.chat to fetch the login token
 * @param {Object} req 
 * @param {Object} res 
 * @returns login Token
 */
async function getAuth(req, res) {

    if (req.session.user && req.session.user.rocketchatAuthToken) {
        res.send({ loginToken: ctx.session.user.rocketchatAuthToken })
        return;
    } else {
        res.status(401).json({ message: 'User not logged in' });
        return;
    }
}

async function getIframe(req, res) {
    const rocketChatServer = 'http://localhost:3000';
    if (req.session.user && req.session.user.rocketchatAuthToken) {
        /* res.render('general', {
                message: ''
            }) */
        // We are sending a script tag to the front-end with the RocketChat Auth Token that will be used to authenticate the user
        return res.send(`<script>
      window.parent.postMessage({
        event: 'login-with-token',
        loginToken: '${ req.session.user.rocketchatAuthToken }'
      }, '${ rocketChatServer }');
    </script><script>window.location = "${ rocketChatServer }"</script>
    `)
    } else {
        return res.status(401).send('User not logged in')
    }
}

function renderForm(req, res) {
    res.render('userform', {
        message: ''
    });

}


module.exports = {
    login,
    getAuth,
    getIframe,
    renderForm,
}