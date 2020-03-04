const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');




const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
const email = 'SadatSayed472@gmail.com'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


const pass = 'add Your Password here';



app.get('/', (req, res) => {
    // console.log("Hi, I am Express...");
    // res.send("Hello world here!!!")
    res.render('index');
});

app.get('/index', (req, res) => {
    // console.log("Hi, I am Express...");
    // res.send("Hello world here!!!")
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/contact/send', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 456,
        secure: true,
        'auth': {
            user: email,
            pass: pass
        }
    });

    const mailOptions = {
        from: "Sayed Sadat",
        to: "SadatSayed472@gmail.com",
        subject: "Testing NodeJs Nodemailer",
        text: "Hi, This is Node JS: "+req.body.name+ " and message is: " + req.body.message,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            res.redirect('/')
        } else {
            console.log('SENT' + info.response);
            res.redirect('/');
        }
    })
})

app.listen(3000);
console.log('Server is Loading...');