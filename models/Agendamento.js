const Sequelize = require('sequelize');
const db = require('../config/database');

const Usuario = require('../models/Usuario')
const Servico = require('../models/Servico')

var agendamento = db.define('Agendamento', 
{
  numeroVaga: {
    dataField: 'numeroVaga',
    allowNull:false,
    type: Sequelize.INTEGER
  },
  dataAgendada: {
    dataField: 'dataAgendada',
    allowNull:false,
    type: Sequelize.DATEONLY
  }, 
  horario: {
    dataField: 'horario',
    allowNull:false,
    type: Sequelize.TIME
  }, 
  servico: {
    dataField:"servico",
    type:Sequelize.INTEGER,
    references: { 
      model: 'Servico', 
      key: 'id' 
    },
    allowNull:false
  },
  cliente: {
    dataField:"cliente",
    type:Sequelize.INTEGER,
    references: { 
      model: 'Usuario', 
      key: 'id' 
    },
    allowNull:false
  }
},{
    timestamps: false,
    freezeTableName:true
  }
);

agendamento.belongsTo
(
  Usuario,
  {
    foreignKey:'cliente',
    targetKey:'id'
  }
);

agendamento.belongsTo
(
  Servico,
  {
    foreignKey:'servico',
    targetKey:'id'
  }
);
 
module.exports = agendamento;