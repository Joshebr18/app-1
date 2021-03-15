const Sequelize = require('sequelize');

const conecta = new Sequelize('perguntas', 'home', ' pass', {

	host: 'localhost',
	dialect: 'mysql'
});

module.exports = conecta;
