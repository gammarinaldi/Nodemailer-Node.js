const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gammarinaldi@gmail.com',
        pass: 'suojeshdbnbnkvwl'
    },
    tls: {
        rejectUnauthorized: false
    }
});

const app = express();
const PORT = process.env.PORT || 1988;

app .use(cors());
app.use(bodyParser.json());
app.get('/', (req,res) => {
    res.send('<h1>Selamat datang di API Nodemailer</h1>');
});

app.post('/sendmail', (req,res) => {
    var { to, subject, html } = req.body;
    var mailOptions = {
        from: 'Warga Biasa <gammarinaldi@yahoo.com>',
        to,
        subject,
        html
    }

    transporter.sendMail(mailOptions, (err,res1) => {
        if(err) {
            console.log(err);
            res.send({ status: 'Error' });
        } else {
            console.log('Success!');
            res.send({ status: 'Success' });
        }
    });
});
app.listen(PORT, () => console.log('API is running, active at PORT ' + PORT));