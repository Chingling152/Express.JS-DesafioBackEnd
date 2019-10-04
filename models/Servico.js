const Sequelize = require('sequelize');
const db = require('../config/database');

module.exports = db.define('Servico', {
    titulo: {
      dataField: 'titulo',
      type:Sequelize.STRING,
      allowNull:false
    },
    descricao: {
      dataField: 'descricao',
      type:Sequelize.STRING
    },
    vagas:{
      dataField:"vagas",
      type:Sequelize.INTEGER,
      allowNull:false
    },
    horarioInicio:{
      dataField:"horarioInicio",
      type:Sequelize.TIME,
      allowNull:false
    },
    horarioFim:{
      dataField:"horarioFim",
      type:Sequelize.TIME,
      allowNull:false
    },
    prestador:{
      dataField:"prestador",
      type:Sequelize.INTEGER,
      references: { 
        model: 'Usuario', 
        key: 'id' 
      },
      allowNull:false
    }
  },{
    timestamps:false,
    freezeTableName:true
  }
); 
  