'use strict';
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const bunyan = require('bunyan');

let mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Mailgen',
        link: 'https://mailgen.js/'
    }
});

let generateRegisterBody = function (user) {

    return {
        body: {
            name: user.firstname + ' ' + user.lastname,
            intro: ['Merci de vous être enregistré. Voici vos informations de connexion :',
                'login : ' + user.login]
        }
    };

};

let generateResetBody = function (user, pass) {

    return {
        body: {
            name: user.firstname + ' ' + user.lastname,
            intro: ['Votre mot de passe à été modifié. Voici le nouveau mot de passe : ' + pass]
        }
    };

};

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lenodecestbien2@gmail.com',
        pass: 'jadorelenode'
    },
    logger: bunyan.createLogger({
        name: 'nodemailer'
    }),
    tls: {
        rejectUnauthorized: false
    }
});

module.exports.sendRegisterMail = (request, response) => {
    let mailOptions = {
        from: 'lenodecestbien2@gmail.com', // sender address
        subject: 'Nodejs', // Subject line
        to: request.payload.user.email,
        html: mailGenerator.generate(generateRegisterBody(request.payload.user))
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) throw error;
        console.log('Envoi du mail de création de ' + request.payload.user.login);
    });
};

module.exports.sendResetMail = (request, response) => {
    let mailOptions = {
        from: 'lenodecestbien2@gmail.com', // sender address
        subject: 'Nodejs', // Subject line
        to: request.payload.user.email,
        html: mailGenerator.generate(generateResetBody(request.payload.user, request.payload.pass))
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) throw error;
        console.log('Envoi du mail de reset de mot de passe de ' + request.payload.user.login);
    });
};