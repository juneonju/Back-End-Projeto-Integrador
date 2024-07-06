const express = require("express");
const router = express.Router();

const usuarioController = require("./controllers/usuarioController")

router.get("/usuarios", usuarioController.buscarTodos);
router.get("/usuario/:id", usuarioController.buscarUm);
router.post("/usuario/login", usuarioController.login)
router.post("/usuario", usuarioController.inserir);
router.put("/usuario/alterar", usuarioController.alterar)
router.patch("/usuario/alterarSenha", usuarioController.alterarSenha)
router.delete("/usuario/:id", usuarioController.excluir)

module.exports = router;