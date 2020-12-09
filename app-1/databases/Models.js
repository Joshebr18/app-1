const Sequelize = require("sequelize");
const connection = require("./conecta");

const Models = connection.define("perguntas", {
	titulo: {
		type: Sequelize.STRING,
		allowNull: false
	},
	descricao: {
		type: Sequelize.TEXT,
		allowNull: false
	}
});

Models.sync({force: false}).then(() => {
	console.log("Tabela criada com sucesso!!");
});

module.exports = Models;