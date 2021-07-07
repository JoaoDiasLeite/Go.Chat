const axios = require('axios');
const { unnauthorized } = require('../utils/error/validationError');
const validationError = require('../utils/error/validationError');
const rocketchatError = require('../utils/error/rocketchatError');
const { response } = require('../app');
require('dotenv').config();

let auth_token = process.env.AUTH_TOKEN;
let user_id = process.env.USER_ID;
const rocketChatServer = 'http://localhost:3000';
const externalServer = 'http://localhost:8081';
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
    // const response =
    return axios.post(`${rocketChatServer}/api/v1/login`, {
        user: email,
        password: password
    });

    //return response;
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

        if (email === user.data.user.emails[0].address) {
            if (name === user.data.user.name) {
                // Perfom login
                return await loginUser(email, password);
            } else {
                throw new validationError.unnauthorized("Name not associated to account");
            }

        } else {
            throw new validationError.unnauthorized("Email not associated to account");
        }
    } catch (ex) {
        if (ex.response.data.error === 'User not found.') {
            try {
                try {
                    // User does not exist, creating user
                    const user = await createUser(username, name, email, password);
                } catch (error) {
                    throw new rocketchatError(401, "Couldn't create account in Rocket.Chat")
                }

                // Perfom login
                return await loginUser(email, password);
            } catch (ex) {
                throw ex;
            }
        }
        throw new rocketchatError(401, 'User Not Found');
    }
}

async function checkUser(username, password) {

    const externalUser = await axios.post(`${externalServer}/auth/token`, {
        username,
        password
    })

    return externalUser;

};
async function listUser(username, next) {

    const users_list = await axios({
        method: 'get',
        url: `${externalServer}/users`,

    })

    const users = users_list.data.data.users;
    const count = Object.keys(users).length;

    for (var i = 0; i < count; i++) {

        if (users[i].username == username) {

            const user_data = await axios({
                method: 'get',
                url: `${externalServer}/users/${i}`,
            })
            const user = user_data.data.data.user;
            return user;
        }

    }
}
async function resumeAuth(token) {

    return await axios.post(`${rocketChatServer}/api/v1/login`, {
        resume: token
    })

}

module.exports = {
    createOrLoginUser,
    fetchUser,
    loginUser,
    createUser,
    checkUser,
    listUser,
    resumeAuth,


}