const express = require('express'); //require itu import module express, express buat create server
const path = require('path'); // path buat tau lokasi file2 lain kaya html css
const bodyParser = require('body-parser'); // buat ngirim dan nerima data
const knex = require('knex'); // biar bisa ngakses database

//buat database
const db = knex({
    client: 'pg', //pg itu postgres
    connection: {
        host: '127.0.0.1', //Database host no
        user: 'postgres', //psql username
        password: 'titipabsen99', //username password
        database: 'balbalandb' //database name
    }
})

const app = express(); //memulai server dengan express js

let initialPath = path.join(__dirname, "public"); // alamat directory file web

app.use(bodyParser.json()); //Buat komunikasi
app.use(express.static(initialPath)); //Bikin alamat directory jadi static

//.get ini sebuah fungsi untuk memberitahu server harus ngapain pas ada get request
app.get('/', (req, res) => {
    res.sendFile(path.join(initialPath, "index.html")); //.sendFile ini buat ngerespond sebuah file ke client
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(initialPath, "register-page-user.html")); //.sendFile ini buat ngerespond sebuah file ke client
})

app.post('/register-user', (req, res) => {
    const { username, email, phoneNum, password, passwordConfirm } = req.body;

    if(!username.length || !email.length || !phoneNum.length || !password.length || !passwordConfirm.length ){
        res.json('fill all the fields!');
    } else{
        db("users").insert({
            username: username,
            email: email,
            phone_num: phoneNum,
            password: password
        })
        .returning(["name", "email", "phone_num"])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            if(err.detail.includes('already exists')){
                res.json('email already exists');
            }
        })
    }
} )

app.listen(3000, (req, res) => {
    console.log('Listening on port 3000...');
});


