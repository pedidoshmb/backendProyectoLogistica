const express = require("express");
const router = express.Router();
const pool = require("../config/db"); // Asegúrate que tienes este archivo de conexión

// Ruta para obtener usuarios de bodega activos
router.get("/activos", (req, res) => {
  pool.query(
    "SELECT id, nombre_empleados FROM usuarios_bodega WHERE estado = 1",
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al obtener usuarios activos" });
      }
      res.json(results);
    }
  );
});

module.exports = router;
