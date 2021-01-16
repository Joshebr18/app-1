const Sequelize = require('sequelize');

const conecta = new Sequelize('perguntas', 'joshe', 'ratatuia', {

	host: 'localhost',
	dialect: 'mysql'
});

module.exports = conecta;
