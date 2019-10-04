# Pluft - Desafio Backend

## Bibliotecas
- express                       : Criação da API			
- sequelize	sequelize-cli       : ORM par abanco de dados
- pg pg-hstore                  : Conexão com banco de dados postgresql
- nodemon                       : Permite programar em tempo real

## Criar banco de dados
Configurar os dados em config/config.json
executar o comando no cmd : **npx sequelize db:migrate**

## Executar aplicação

Iniciar API : **npm start**
Tempo real (desenvolvimento) : **npx nodemon index.js**