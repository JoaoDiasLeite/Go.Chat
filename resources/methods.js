const axios = require('axios');
const { unnauthorized } = require('../utils/error/validationError');
const validationError = require('../utils/error/validationError');
require('dotenv').config();

let auth_token = process.env.AUTH_TOKEN;
let user_id = process.env.USER_ID;
const rocketChatServer = 'http://localhost:3000';
const rocketChatAdminAuthToken = auth_token;
const rocketChatAdminUserId = user_id;

async function fetchUser(username) {

    const rocketChatUser = await axios({
        method: 'get',
        url: `${rocketChatServer}/api/v1/users.info`,
        params: { username: username },
        headers: {
            'X-Auth-Token': rocketChatAdminAuthToken,
            'X-User-Id': rocketChatAdminUserId,
        }
    })

    return rocketChatUser;
}

async function loginUser(email, password) {
    const response = await axios.post(`${rocketChatServer}/api/v1/login`, {
        user: email,
        password: password
    });

    return response;
}

async function createUser(username, name, email, password) {
    const rocketChatUser = await axios.post(`${rocketChatServer}/api/v1/users.create`, {
        name,
        email,
        password,
        username,
        verified: true
    }, {
        headers: {
            'X-Auth-Token': rocketChatAdminAuthToken,
            'X-User-Id': rocketChatAdminUserId
        }
    })

    return rocketChatUser;
}

async function createOrLoginUser(username, name, email, password, next) {
    try {
        const user = await fetchUser(username);
        //console.log(user.data.user.name)
        if (email === user.data.user.emails[0].address) {
            if (name === user.data.user.name) {
                // Perfom login
                return await loginUser(email, password);
            } else {
                return next(validationError.unnauthorized("Name not associated to account"));
            }

        } else {
            return next(validationError.unnauthorized("Email not associated to account"));
        }




    } catch (ex) {
        //console.log(ex)
        //console.log(ex.response.status)
        if (ex.response.status === 401) {
            // User does not exist, creating user
            const user = await createUser(username, name, email, password);
            // Perfom login
            return await loginUser(email, password);
        }
        throw ex;
    }
}
module.exports = {
    createOrLoginUser,
    fetchUser,
    loginUser,
    createUser
}