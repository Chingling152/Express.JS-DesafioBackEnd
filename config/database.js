const Sequelize = require('sequelize')

module.exports = new Sequelize(
    'api', 'postgres', 'javascripto', 
    {
        host: 'localhost',
        dialect: 'postgres'
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