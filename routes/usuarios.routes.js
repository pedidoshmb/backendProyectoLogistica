const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarios.controller");
const db = require("../config/db");

// Listar todos los usuarios base
router.get("/", usuariosController.getAllUsuarios);

// Crear usuario base
router.post("/", usuariosController.createUsuario);

// Actualizar usuario base
router.put("/:id", usuariosController.updateUsuario);

// Inactivar usuario
router.put("/inactivar/:id", usuariosController.inactivarUsuario);

router.post("/login", usuariosController.login);

module.exports = router;
