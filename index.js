'use strict'

const express = require("express"); //importo la libreria
const bodyParser = require("body-parser");
const mysql = require("mysql2");

var app = express(); //creo una instancia
app.use(bodyParser.urlencoded({extended:true}));

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "teletok_lambda"
})

app.listen(7000, function () {
    console.log("servidor levantado exitosamente");
});

conn.connect(function (err) {
    if(err){
        console.log(err);
    }else{
        console.log("Conexion exitosa")
    }

});

