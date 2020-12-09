const Sequelize = require('sequelize');

const conecta = new Sequelize('perguntas', 'joshe', 'eu18br', {

	host: 'localhost',
	dialect: 'mysql'
});

module.exports = conecta;