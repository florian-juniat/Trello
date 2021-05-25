const router = require("express").Router()
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer')
const {client} = require('../database/db')

router.post("/login", async (req, res) => {
    if (!req.body.password || !req.body.email) {
        res.status(400).send("missing one or more arguments");
        return;
    }
    const response = await client.query("select * from users")
    console.log(response.rows.length);
    for (var i = 0; i < response.rows.length; i++) {
        if (response.rows[i].email == req.body.email) {
            var token = jwt.sign({indice : response.rows[i].id}, 'T1pha1n9_n4_p4s_d_st4g9');
            res.status(200).send({token: token});
            return;
        }
    }
    res.status(400).send("you don't have an account")
});

router.get('/verify/:token', async (req, res) => {
    var token = req.params.token;
    const response = await client.query("select * from users")
    var decoded = jwt.verify(token, 'T1pha1n9_n4_p4s_d_st4g9');
    for (var i = 0; i < response.rows.length; i++) {
        if (response.rows[i].email == decoded.email) {
            client.query("update users set verify = 'true';");
            req.body.verify = 'Verification succed';
            res.send(req.body.verify);
            return;
        }
    }
});

router.post("/register", async (req, res) => {
    const verify = false;
    if (!req.body.password || !req.body.email || !req.body.name) {
        res.status(400).send("missing one or more arguments");
        return;
    }
    const response = await client.query("select * from users")
    for (var i = 0; i < response.rows.length; i++) {
        if (response.rows[i].email == req.body.email) {
            res.status(401).send("already have an account");
        }
    }
    var command = "insert into users(email, password, name, verify) values ('" + req.body.email + "', '" + req.body.password + "' , '" + req.body.name + "' , '" + verify + "' );"
    const insert = await client.query(command)
    var token = jwt.sign({email: req.body.email}, 'T1pha1n9_n4_p4s_d_st4g9');
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'jeanmarcelleaugustin@gmail.com',
                    pass: 'cm7vuhgqudth'
                }
            });
            var url = "http://localhost:8080/auth/verify/".concat(token);
            var mailOptions = {
                from: 'EpiTrello@gmail.com',
                to: req.body.email,
                subject: 'Confirmate your EpiTrello account',
                text: "click on the following url to validate your account : ",
                html:url
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error)
                    console.log(error);
                else
                    console.log('Email sent: ' + info.response);
            });
    res.status(200).send("registered");
});


module.exports = router