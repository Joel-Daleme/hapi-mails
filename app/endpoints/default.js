'use strict';

const mail = require('../handlers/mail');

exports.register = (server, options, next) => {
    server.route([
        {
            method: 'POST',
            path: '/user/register',
            config: {
                plugins: {
                    'hapi-io': 'user-register'
                },
                tags: ['api']
            },
            handler: mail.sendRegisterMail
        },
        {
            method: 'POST',
            path: '/user/resetPass',
            config: {
                plugins: {
                    'hapi-io': 'user-reset-pass'
                },
                tags: ['api']
            },
            handler: mail.sendResetMail
        }
    ]);
    next();
};

exports.register.attributes = {
    name: 'default-routes'
};