var express = require('express');//importa express.js

var app = express();

app.use(express.urlencoded({ extended: false }));//configurações da API 

//endpoint inicial
app.get('/', (request, response) => {
    res.send('Isso é um teste!');//vou trocar por uma lista de enpoints aqui
});

app.listen(5000);//definir a porta da API