const express = require('express');//importa express.js
const bodyParser = require('body-parser');//importar body parser (converter corpo de requisições em objetos)

var app = express();

app.use(bodyParser.json())//converter json em objetos
app.use(express.urlencoded({ extended: false }));//configurações da API 
app.use('/usuarios',require('./routes/Usuarios'))//chama o "controller" de usuarios

//endpoint inicial
app.get('/', (request, response) => {
    response.status(200).send('Isso é um teste!');//vou trocar por uma lista de enpoints aqui
});

app.listen(5000);//definir a porta da API