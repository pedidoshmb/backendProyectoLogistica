const db = require("../config/db");
const path = require("path");

// Obtener todas las entregas
exports.getAllEntregas = (req, res) => {
  const sql = `
        SELECT e.id, e.num_pedido, e.observaciones, e.pdf_path, e.fecha_registro
        FROM entregas_clientes e
        ORDER BY e.fecha_registro DESC
    `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Obtener entrega por ID
exports.getEntregaById = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM entregas_clientes WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.length === 0)
        return res.status(404).json({ message: "Entrega no encontrada" });
      res.json(result[0]);
    }
  );
};

// Crear entrega + actualizar estado pedido
exports.createEntrega = (req, res) => {
  const { num_pedido, observaciones } = req.body;
  const pdfPath = req.file ? req.file.path : null;

  if (!pdfPath)
    return res.status(400).json({ error: "Debe subir un archivo PDF" });

  const insertSql = `
        INSERT INTO entregas_clientes (num_pedido, pdf_path, observaciones)
        VALUES (?, ?, ?)
    `;
  db.query(insertSql, [num_pedido, pdfPath, observaciones], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    // Actualizar estado a "entregado"
    const updateSql = `
            UPDATE pedidos 
            SET id_estado = (SELECT id FROM estados WHERE descripcion_estado = 'entregado' LIMIT 1) 
            WHERE num_pedido = ?
        `;
    db.query(updateSql, [num_pedido], (err2) => {
      if (err2) return res.status(500).json({ error: err2 });
      res.json({
        message: 'Entrega registrada y pedido actualizado a "Entregado"',
        id: result.insertId,
      });
    });
  });
};

// Actualizar entrega
exports.updateEntrega = (req, res) => {
  const { id } = req.params;
  const { num_pedido, observaciones } = req.body;
  const pdfPath = req.file ? req.file.path : null;

  const sql = `
        UPDATE entregas_clientes 
        SET num_pedido = ?, observaciones = ?, pdf_path = COALESCE(?, pdf_path)
        WHERE id = ?
    `;
  db.query(sql, [num_pedido, observaciones, pdfPath, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Entrega actualizada con éxito" });
  });
};

// Eliminar entrega
exports.deleteEntrega = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM entregas_clientes WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Entrega eliminada con éxito" });
  });
};
