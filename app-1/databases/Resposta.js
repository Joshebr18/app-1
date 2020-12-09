const Sequelize = require("sequelize");
const connection = require("./conecta");

const Resposta = connection.define("respostas", {
	corpo: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	perguntaId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

Resposta.sync({force: false}).then(() => {
	console.log("Tabela de resposta criada com sucesso!!");
});

module.exports = Resposta;