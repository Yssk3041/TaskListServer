// servidor Express

const express = require('express');
const validateMethod = require('./validateMethod');
const listTasks = require('./list-view-router');
const listEdit = require ('./list-edit-router')

const app = express();
const port = 3000;
const host = "localhost";

app.use(express.json());
app.use(validateMethod)

app.use('/tasks', listTasks);
app.use('/tasks', listEdit);

app.listen(port, host, ()=>{
    console.log("Servidor encendido");
})

