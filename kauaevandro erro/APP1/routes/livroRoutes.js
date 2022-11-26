const express = require("express");
const routes = express.Router();

const livroController = require("../controllers/livroController");
const auth = require("../middlewares/AtendenteAuth");

routes.get("/livro/",auth, livroController.listar);
routes.post("/livro",auth, livroController.cadastrarPost);
routes.get("/livro/cadastrar/:codigo?",auth, livroController.cadastrarGet);
routes.get("/livro/relatorio",auth, livroController.relatorio);
routes.get("/livro/:codigo",auth, livroController.detalhar);
routes.get("/livro/remover/:codigo",auth, livroController.remover);

module.exports = routes;