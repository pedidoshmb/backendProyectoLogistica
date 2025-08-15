const db = require("../config/db");

// Obtener todos los clientes
exports.getAllClientes = (req, res) => {
  db.query("SELECT * FROM clientes", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Obtener cliente por ID
exports.getClienteById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM clientes WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "Cliente no encontrado" });
    res.json(result[0]);
  });
};

// Crear cliente
exports.createCliente = (req, res) => {
  const { nit, nombre, direccion, celular, contacto, ciudad, email } = req.body;

  const sql = `
        INSERT INTO clientes (nit, nombre, direccion, celular, contacto, ciudad, email)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    sql,
    [nit, nombre, direccion, celular, contacto, ciudad, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Cliente creado con éxito", id: result.insertId });
    }
  );
};

// Actualizar cliente
exports.updateCliente = (req, res) => {
  const { id } = req.params;
  const { nit, nombre, direccion, celular, contacto, ciudad, email } = req.body;

  const sql = `
        UPDATE clientes SET 
        nit = ?, nombre = ?, direccion = ?, celular = ?, contacto = ?, ciudad = ?, email = ?
        WHERE id = ?
    `;

  db.query(
    sql,
    [nit, nombre, direccion, celular, contacto, ciudad, email, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Cliente actualizado con éxito" });
    }
  );
};

// Eliminar cliente
exports.deleteCliente = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM clientes WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Cliente eliminado con éxito" });
  });
};
