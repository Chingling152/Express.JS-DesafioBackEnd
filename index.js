const express = require('express');//importa express.js
const bodyParser = require('body-parser');//importar body parser 
var app = express();

app.use(bodyParser.json())//converter json em objetos
app.use(express.urlencoded({ extended: false }));//configurações da API 

//endpoint inicial
//app.get('/', (request, response) => response.send(require("./config/endpoints.json")));//teste

app.use('/usuarios',require('./routes/Usuarios'))//chama o "controller" de usuarios
app.use('/servicos',require('./routes/Servicos'))
app.use('/agendamentos',require('./routes/Agendamentos'))

app.listen(5000);//definir a porta da API