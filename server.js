const express = require('express')
const Datastore = require('nedb');
const {
    Auth
} = require("two-step-auth");



const app = express()
app.use(express.static(__dirname + `/public`))
app.use(express.json({
    limit: '5mb'
}));

const database = new Datastore('database.db');
const database1 = new Datastore('database1.db');

database.loadDatabase();
database1.loadDatabase();

const port = process.env.PORT

function randomize(data1) {
    let questions = [];

    let i = 0;
    let num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    while (i < 10) {
        let random = Math.floor(Math.random() * num.length)
        let spli = num.splice(random, 1);
        questions.push(data1[spli[0]]);;
        i++;
    }
    return questions;
}

app.get('/api', (request, response) => {

    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.send(randomize(data));
    });
});


app.get('/admin-login', (req, res) => {
    res.sendFile(__dirname + `/public/adminLogin.html`);

});

app.get('/result', (req, res) => {
    res.sendFile(__dirname + `/public/score.html`);

});


async function login(emailId) {
    const res = await Auth(emailId);

    let otp = res.OTP;
    let status = res.success;
    return {
        otp,
        status
    };
}



app.post('/otp', (req, res) => {
    const data = req.body;
    login(data.email).then(res1 => {
        res.json(res1);
    });
});



app.post('/resultdata', (request, response) => {
    const data = request.body;
    database1.insert(data);
    response.json(data);

});


app.post('/add_questions', (request, response) => {
    const data = request.body;

    const data1 = {
        question: data.question,
        options: [data.choices[0], data.choices[1], data.choices[2], data.choices[3]],
        correctIndex: data.correctindex
    }
    database.insert(data1);
});




app.get('/rankings', (request, response) => {
    database1.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

app.listen(port, () => {
    console.log(`server started on ${port}`)
})