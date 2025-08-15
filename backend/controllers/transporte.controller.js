const db = require("../config/db");

// Obtener todos los transportes
exports.getAllTransporte = (req, res) => {
  db.query("SELECT * FROM transporte", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Obtener transporte por ID
exports.getTransporteById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM transporte WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "Transporte no encontrado" });
    res.json(result[0]);
  });
};

// Crear transporte + actualizar estado del pedido a "En Ruta"
exports.createTransporte = (req, res) => {
  const { num_pedido, placa, tipo_transporte, conductor, fecha_hora_salida } =
    req.body;

  // Insertar transporte
  const insertSql = `
        INSERT INTO transporte (num_pedido, placa, tipo_transporte, conductor, fecha_hora_salida)
        VALUES (?, ?, ?, ?, ?)
    `;
  db.query(
    insertSql,
    [num_pedido, placa, tipo_transporte, conductor, fecha_hora_salida],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      // Actualizar estado del pedido a "En Ruta" (id_estado correspondiente)
      const updateSql = `UPDATE pedidos SET id_estado = (SELECT id FROM estados WHERE descripcion_estado = 'en ruta' LIMIT 1) WHERE num_pedido = ?`;
      db.query(updateSql, [num_pedido], (err2) => {
        if (err2) return res.status(500).json({ error: err2 });
        res.json({
          message: 'Transporte creado y pedido actualizado a "En Ruta"',
          id: result.insertId,
        });
      });
    }
  );
};

// Actualizar transporte
exports.updateTransporte = (req, res) => {
  const { id } = req.params;
  const { num_pedido, placa, tipo_transporte, conductor, fecha_hora_salida } =
    req.body;

  const sql = `
        UPDATE transporte SET num_pedido = ?, placa = ?, tipo_transporte = ?, conductor = ?, fecha_hora_salida = ?
        WHERE id = ?
    `;
  db.query(
    sql,
    [num_pedido, placa, tipo_transporte, conductor, fecha_hora_salida, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Transporte actualizado con éxito" });
    }
  );
};

// Eliminar transporte
exports.deleteTransporte = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM transporte WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Transporte eliminado con éxito" });
  });
};
