'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Servico', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull:false
      },
      descricao: {
        type: Sequelize.STRING
      },
      vagas: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      horarioInicio: {
        type: Sequelize.TIME,
        allowNull:false
      },
      horarioFim: {
        type: Sequelize.TIME,
        allowNull:false
      },    
      prestador:{
        type:Sequelize.INTEGER,
        references: { 
          model: 'Usuario', 
          key: 'id' 
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Servico');
  }
};