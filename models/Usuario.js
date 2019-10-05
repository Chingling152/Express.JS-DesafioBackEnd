const Sequelize = require('sequelize');
const db = require('../config/database');

module.exports = db.define('Usuario', {
    nome: {
      dataField: 'nome',
      type:Sequelize.STRING,
      allowNull:false
    },
    email: {
      dataField: 'email',
      type:Sequelize.STRING,
      allowNull:false
    },
    senha: {
      dataField: 'senha',
      type:Sequelize.STRING,
      allowNull:false
    },
    privilegio:{
      dataField:'privilegio',
      type:Sequelize.INTEGER,
      allowNull:false
    }
  }, {
    timestamps: false,
    freezeTableName:true
  });