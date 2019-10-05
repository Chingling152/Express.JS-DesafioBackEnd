# Pluft - Desafio Backend
API de agendamento de serviços.


## Bibliotecas
- **express**                           : Criação da API  
- **sequelize**	**sequelize-cli**       : ORM par abanco de dados
- **pg pg-hstore**                      : Conexão com banco de dados postgresql
- **nodemon**                           : Permite programar em tempo real
- **jsonwebtoken**                      : Autenticação 
- **dotenv-safe**                       : Variaveis de ambiente 

npm install deve instalar todas  

## Criar banco de dados
- Altere os valores em **config/config.json** de acordo com seu banco de dados
- executar o comando no cmd : **npx sequelize db:migrate**  

## Executar aplicação  
Iniciar API : **npm start**  
Tempo real (desenvolvimento) : **npx nodemon index.js**

## Endpoints
Todos os endpoints estão disponiveis e podem ser acessados atraves do postman neste [link](https://www.getpostman.com/collections/02a7f12690c57544b31b)