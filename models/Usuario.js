const Sequelize = require('sequelize');
const db = require('../config/database');

module.exports = db.define('Usuario', {
    nome: {
      dataField: 'nome',
      type:Sequelize.STRING,
      validate:{
        notEmpty:{msg:"O nome é obrigatorio"},
        notNull:{msg:"O nome é obrigatorio"},
        isAlpha: {msg: "Seu nome não pode conter numeros"},
        len: {arg:[1,200],msg : "Valor maximo de caracteres atingido"}
      },
      allowNull:false
    },
    email: {
      dataField: 'email',
      type:Sequelize.STRING,
      validate: {
        notNull:{msg:"O email é obrigatorio"},
        len: {arg:[1,200],msg : "Valor maximo de caracteres atingido"},
        isEmail:{msg : "Email invalido"},
      },
      allowNull:false
    },
    senha: {
      dataField: 'senha',
      type:Sequelize.STRING,
      allowNull:false
    },
    privilegio:{
      dataField:'privilegio',
      type: Sequelize.ENUM,
      values:['comum','lojista','administrador'],
      validate:{
        isIn: {
          args: [[1,2,3]],
          msg: "Você só pode definir 3 tipos de usuario \n1 - Comum\n2 - Lojista\n3 - Administrador"
        }
      },
      allowNull:false
    }
  }, {
    timestamps: false,
    freezeTableName:true
  });