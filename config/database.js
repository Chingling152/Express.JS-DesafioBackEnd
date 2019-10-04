const Sequelize = require('sequelize')
const db  = require("./config.json")["development"]

//define os valores em config.json ;-;
module.exports = new Sequelize(
    db["database"],
    db["username"],
    db["password"],
    {
        host:db['host'],
        dialect:db['dialect'],
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
);

// db
// .authenticate()
// .then( ()=>{
//     console.log("Funcionou")
// })
// .catch((ER)=>{
//     console.log("Ñ Funcionou" + ERR)
// })