const axios = require('axios');

require('dotenv').config();
let auth_token = process.env.AUTH_TOKEN;
let user_id = process.env.USER_ID;
const rocketChatServer = 'http://localhost:3000';
const rocketChatAdminAuthToken = auth_token;
const rocketChatAdminUserId = user_id;





async function fetchUser(username) {
    const params = {
        username: username
    }


    const rocketChatUser = await axios.get(`${rocketChatServer}/api/v1/users.info`, {
        headers: {

            'X-Auth-Token': rocketChatAdminAuthToken,
            'X-User-Id': rocketChatAdminUserId
        }

    }, {
        params: {
            username: username
        }
    });

    return rocketChatUser;
}

async function loginUser(username, password) {
    const response = await axios.post(`${rocketChatServer}/api/v1/login`, {
        username,
        password
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

async function createOrLoginUser(username, name, email, password, ) {
    try {

        const user = await fetchUser(username);

        // Perfom login
        return await loginUser(username, password);
    } catch (ex) {

        if (ex.response.status === 401) {
            // User does not exist, creating user
            const user = await createUser(username, name, email, password);
            // Perfom login

            return await loginUser(username, password);
        } else {

            throw ex;
        }
    }
}
module.exports = {
    createOrLoginUser,
    fetchUser,
    loginUser,
    createUser
}