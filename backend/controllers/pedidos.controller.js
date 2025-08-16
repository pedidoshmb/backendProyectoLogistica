const db = require("../config/db");

// Obtener todos los pedidos con información de cliente, estado y usuario
exports.getAllPedidos = (req, res) => {
  const sql = `
    SELECT p.*, c.nombre AS cliente_nombre, e.descripcion_estado, u.nombre AS usuario_nombre
    FROM pedidos p
    LEFT JOIN clientes c ON p.id_cliente = c.id
    LEFT JOIN estados e ON p.id_estado = e.id
    LEFT JOIN usuarios u ON p.usuario_id = u.id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Obtener un pedido por ID
exports.getPedidoById = (req, res) => {
  const { id } = req.params;
  const sql = `
        SELECT p.*, c.nombre AS cliente_nombre, e.descripcion_estado, u.nombre AS usuario_nombre
        FROM pedidos p
        JOIN clientes c ON p.id_cliente = c.id
        JOIN estados e ON p.id_estado = e.id
        JOIN usuarios u ON p.usuario_id = u.id
        WHERE p.id = ?
    `;
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ message: "Pedido no encontrado" });
    res.json(result[0]);
  });
};

// Crear un pedido (fecha de registro automática)
exports.createPedido = (req, res) => {
  console.log("📦 Datos recibidos en createPedido:", req.body); // 👈 Depuración

  const {
    id_cliente,
    nit,
    num_pedido,
    numero_items,
    separador,
    auditor,
    id_estado,
    fecha_hora_entrega_ventas,
    fecha_entrega_cliente,
    usuario_id,
  } = req.body;

  const sql = `
    INSERT INTO pedidos (
      id_cliente, nit, num_pedido, fecha_registro, numero_items, separador, auditor, 
      id_estado, fecha_hora_entrega_ventas, fecha_entrega_cliente,usuario_id
    ) VALUES (?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      id_cliente,
      nit,
      num_pedido,
      numero_items,
      separador,
      auditor,
      id_estado,
      fecha_hora_entrega_ventas,
      fecha_entrega_cliente,
      usuario_id,
    ],
    (err, result) => {
      if (err) {
        console.error("❌ Error al insertar pedido:", err.sqlMessage);
        return res.status(500).json({ error: err.sqlMessage });
      }
      res.json({ message: "Pedido creado con éxito", id: result.insertId });
    }
  );
};

// Actualizar un pedido
exports.updatePedido = (req, res) => {
  const { id } = req.params;
  const {
    id_cliente,
    nit,
    num_pedido,
    numero_items,
    separador,
    auditor,
    id_estado,
    fecha_hora_entrega_ventas,
    fecha_entrega_cliente,
    usuario_id,
  } = req.body;

  const sql = `
        UPDATE pedidos SET
            id_cliente = ?, nit = ?, num_pedido = ?, numero_items = ?, separador = ?, auditor = ?,
            id_estado = ?, fecha_hora_entrega_ventas = ?, fecha_entrega_cliente = ?,usuario_id = ?
        WHERE id = ?
    `;

  db.query(
    sql,
    [
      id_cliente,
      nit,
      num_pedido,
      numero_items,
      separador,
      auditor,
      id_estado,
      fecha_hora_entrega_ventas,
      fecha_entrega_cliente,
      usuario_id,
      id,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Pedido actualizado con éxito" });
    }
  );
};

// Eliminar un pedido
exports.deletePedido = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM pedidos WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Pedido eliminado con éxito" });
  });
};
