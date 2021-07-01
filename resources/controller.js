const validationError = require('../utils/error/validationError');
const rocketchatError = require('../utils/error/rocketchatError')
const method = require('./methods');
const model = require('./model')
const redis = require('redis');
const { promisifyAll } = require('bluebird');
promisifyAll(redis);
const REDIS_PORT = process.env.REDIS_PORT;
const client = redis.createClient(REDIS_PORT);

// Cache middleware
async function cache(req, res, next) {
    try {
        validateParams = await model.schema.validateAsync(req.body);
    } catch (error) {
        return next(validationError(400, 'Bad Request'));
    }
    const username = validateParams.username;
    const utoken = await client.getAsync(username + 'token')
    const uid = await client.getAsync(username + 'id')
    if (utoken && uid !== null) {
        try {
            const response = await method.resumeAuth(utoken);
            req.session.user = validateParams;
            // Saving the rocket.chat auth token and userId in the database 
            const authtoken = token;
            const uid = userId;
            req.session.user.rocketchatAuthToken = authtoken;
            req.session.user.rocketchatUserId = uid;
            res.redirect('/rocket_chat_iframe');
        } catch (error) {
            if (error.response.data.status == 'error' && error.response.data.error == '403') {
                login(req, res, next);
            } else {
                next(new rocketchatError.unnauthorized(error.response.data.message))
            }
        }

    } else {
        login(req, res, next);
    }
}
/**
 * Function used to validate user from external service and login or create user in Rocket.Chat
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @returns redirects page
 */
async function login(req, res, next) {
    let validateParams = '';
    try {
        validateParams = await model.schema.validateAsync(req.body);

    } catch (error) {

        return next(validationError(400, 'Bad Request'));
    }
    const username = validateParams.username;
    const password = validateParams.password;
    // ....CODE TO LOGIN USER
    try {
        const userOk = await method.checkUser(username, password, next);
        try {
            const userData = await method.listUser(username, next);
            // Creating or login user into Rocket chat 
            try {
                const response = await method.createOrLoginUser(username, userData.name, userData.email, password, next);
                req.session.user = validateParams;
                // Saving the rocket.chat auth token and userId in the database 
                const authtoken = response.data.data.authToken;
                const uid = response.data.data.userId
                req.session.user.rocketchatAuthToken = authtoken;
                req.session.user.rocketchatUserId = uid;
                client.setex(username + 'token', 3600, JSON.stringify(authtoken))
                client.setex(username + 'id', 3600, JSON.stringify(uid))
                    //await user.save();
                    //res.send({ message: 'Login Successful' }); //Uncomment to use as API request
                res.redirect('/rocket_chat_iframe'); //Use with browser
            } catch (ex) {

                next(new rocketchatError(401, "Rocket.Chat Login Failed"));
            }

        } catch (error) {
            next(new validationError(500, 'Internal Server Error'))
        }


    } catch (error) {
        next(new validationError(401, 'Invalid User Or Password'))

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
/**
 * This method will be used to inject javascript code to the browser in order to login in Rocket.Chat
 * @param {Object} req 
 * @param {Object} res 
 * @returns rocket.chat page with user logged in
 */
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
    cache,
}