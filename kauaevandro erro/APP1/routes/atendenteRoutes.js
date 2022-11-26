const express = require("express");
const routes = express.Router();


const atendenteController = require("../controllers/atendenteController");
const auth = require("../middlewares/atendenteAuth");

routes.get("/atendente/relatorio", auth, atendenteController.relatorio);
routes.get("/atendente/", auth, atendenteController.listar);
routes.get("/atendente/cadastrar/:email?", atendenteController.cadastrarGet);
routes.post("/atendente", atendenteController.cadastrarPost);
routes.get("/atendente/login",atendenteController.login);
routes.post("/atendente/login", atendenteController.loginpost);
routes.get("/atendente/remover/:email", auth, atendenteController.remover);
routes.get("/atendente/logout", auth, atendenteController.logout);
routes.get("/atendente/:email", auth, atendenteController.detalhar);



module.exports = routes;