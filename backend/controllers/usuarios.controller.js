const db = require("../config/db"); // tu conexión a MySQL
const bcrypt = require("bcrypt");

// Listar usuarios
exports.getAllUsuarios = (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
      console.error("Error al obtener usuarios:", err);
      return res.status(500).json({ error: "Error al obtener usuarios" });
    }
    res.json(results);
  });
};

// Crear usuario
exports.createUsuario = async (req, res) => {
  try {
    const { login, password, nombre, cedula, rol } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO usuarios (login, password, nombre, cedula, rol, activo) VALUES (?, ?, ?, ?, ?, 1)",
      [login, hashedPassword, nombre, cedula, rol]
    );
    res.json({ message: "Usuario creado exitosamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

// Actualizar usuario
exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { login, password, nombre, cedula, rol } = req.body;

    let query = "UPDATE usuarios SET login=?, nombre=?, cedula=?, rol=?";
    const params = [login, nombre, cedula, rol];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ", password=?";
      params.push(hashedPassword);
    }

    query += " WHERE id=?";
    params.push(id);

    await db.query(query, params);
    res.json({ message: "Usuario actualizado exitosamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

// Inactivar usuario
exports.inactivarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("UPDATE usuarios SET activo = 0 WHERE id = ?", [id]);
    res.json({ message: "Usuario inactivado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al inactivar usuario" });
  }
};
