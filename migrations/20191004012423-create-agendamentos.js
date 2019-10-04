'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => 
  {
    return queryInterface.createTable('Agendamento', 
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numeroVaga: {
        allowNull:false,
        type: Sequelize.INTEGER
      },
      dataAgendada: {
        allowNull:false,
        type: Sequelize.DATEONLY
      }, 
      horario: {
        allowNull:false,
        type: Sequelize.TIME
      }, 
      servico: {
        type:Sequelize.INTEGER,
        references: { 
          model: 'Servico', 
          key: 'id' 
        },
        allowNull:false
      },
      cliente: {
        type:Sequelize.INTEGER,
        references: { 
          model: 'Usuario', 
          key: 'id' 
        },
        allowNull:false
      }
    },{});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Agendamentos');
  }
};