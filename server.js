const express = require('express'); //require itu import module express, express buat create server
const path = require('path'); // path buat tau lokasi file2 lain kaya html css
const bodyParser = require('body-parser'); // buat ngirim dan nerima data
const knex = require('knex'); // biar bisa ngakses database

const app = express(); //memulai server dengan express js

let initialPath = path.join(__dirname, "/public"); // alamat directory file web

app.use(bodyParser.json()); //Buat komunikasi
app.use(express.static(initialPath)); //Bikin alamat directory jadi static

//.get ini sebuah fungsi untuk memberitahu server harus ngapain pas ada get request
app.get('/', (req, res) => {
    res.sendFile(path.join(initialPath, "/index.html")); //.sendFile ini buat ngerespond sebuah file ke client
})

app.listen(3000, (req, res) => {
    console.log('Listening on port 3000...');
});


