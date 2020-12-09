// import modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conecta = require("./databases/conecta");
const Models = require("./databases/Models");
const Resposta = require("./databases/Resposta");

// conecta com o banco de dados
conecta 
	.authenticate()
	.then(() => {
		console.log("Conexão com o banco de dados feita com sucesso!!");
	})
	.catch((msgErro) => {
		console.log(msgErro);
	});

// user ejs for redenrizer html
app.set('view engine', 'ejs');
// arquivos estaticos
app.use(express.static('public'));

// pega os dados do formulario 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// routs
// mostra as lista de perguntas de forma ordenada 
// de forma descrescente
app.get("/", (req, res)=> {
	 Models.findAll({raw: true, order:[
	 	['id', 'DESC'] // lista de forma decrescente
	 	]}).then(perguntas => {
	 	//console.log(perguntas);
	 	res.render("index", {
	 		perguntas: perguntas // mostra os dados do banco 
	 	});                      // na rota index
	 });
	
});

app.get("/perguntas", (req, res)=>{
	res.render("perguntas");
});

//captura os dados e salva nas variaveis
app.post("/salvar", (req,res) => {
	var titulo = req.body.titulo;
	var descricao = req.body.descricao;
	//res.send("Formulário recebido! Titulo: " + titulo + " " + "Descrição: " + descricao);

	Models.create({
		titulo: titulo,
		descricao: descricao 
	}).then(() => {
		res.redirect("/");
	});
});
//----------------------------------------
app.get("/resposta/:id", (req, res) => {
	var id = req.params.id;
	Models.findOne({
		where: {id: id}
	}).then(perguntas => {
		if(perguntas != undefined){

			Resposta.findAll({
				where: {perguntaId: perguntas.id},
				order :[["id", "DESC"]]
			}).then(respostas => {
				res.render("resposta", {
				perguntas: perguntas,
				respostas: respostas
				});
			});

			
		}else{
			res.redirect("/");
		}
	})
});
//----------------------------------------- 
app.post("/responder", (req, res) => {
	var corpo = req.body.corpo;
	var perguntaId = req.body.pergunta;
	Resposta.create({
		corpo: corpo,
		perguntaId: perguntaId
	}).then(() => {
		res.redirect("/resposta/" + perguntaId);
	});

});
// run aplication
app.listen(8181,() => {
	console.log("App rodando!!");
}); 