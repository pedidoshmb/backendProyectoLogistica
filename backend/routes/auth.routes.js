const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../config/db"); // O la ruta correcta a tu conexión mysql

const SECRET_KEY = "mi_clave_secreta_super_segura";

router.post("/login", (req, res) => {
  const { login, password } = req.body;

  pool.query(
    "SELECT * FROM usuarios WHERE login = ?",
    [login],
    async (err, results) => {
      if (err) {
        console.error("Error en consulta:", err);
        return res.status(500).json({ message: "Error interno del servidor" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }

      const usuario = results[0];

      const match = await bcrypt.compare(password, usuario.password);

      if (!match) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      const token = jwt.sign(
        { id: usuario.id, login: usuario.login },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.json({ token });
    }
  );
});

module.exports = router;
