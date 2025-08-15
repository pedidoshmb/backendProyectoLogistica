const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuarios.controller");
const db = require("../config/db");

// Listar todos los usuarios
router.get("/", usuariosController.getAllUsuarios);

// Crear usuario
router.post("/", usuariosController.createUsuario);

// Actualizar usuario
router.put("/:id", usuariosController.updateUsuario);

// Inactivar usuario
router.put("/inactivar/:id", usuariosController.inactivarUsuario);

module.exports = router;
