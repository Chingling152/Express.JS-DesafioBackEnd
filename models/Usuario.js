const Sequelize = require('sequelize');
const db = require('../config/database');

module.exports = db.define('Usuario', {
    nome: {
      dataField: 'nome',
      type:Sequelize.STRING
    },
    email: {
      dataField: 'email',
      type:Sequelize.STRING
    }
  }, {});