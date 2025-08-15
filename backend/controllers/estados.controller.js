const db = require("../config/db");

// Obtener todos los estados
exports.getAllEstados = (req, res) => {
  db.query("SELECT * FROM estados", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Obtener estado por ID
exports.getEstadoById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM estados WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "Estado no encontrado" });
    res.json(result[0]);
  });
};

// Crear estado
exports.createEstado = (req, res) => {
  const { descripcion_estado } = req.body;
  db.query(
    "INSERT INTO estados (descripcion_estado) VALUES (?)",
    [descripcion_estado],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Estado creado con éxito", id: result.insertId });
    }
  );
};

// Actualizar estado
exports.updateEstado = (req, res) => {
  const { id } = req.params;
  const { descripcion_estado } = req.body;
  db.query(
    "UPDATE estados SET descripcion_estado = ? WHERE id = ?",
    [descripcion_estado, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Estado actualizado con éxito" });
    }
  );
};

// Eliminar estado
exports.deleteEstado = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM estados WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Estado eliminado con éxito" });
  });
};
