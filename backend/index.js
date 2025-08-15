const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Rutas
app.use("/pedidos", require("./routes/pedidos.routes"));
app.use("/clientes", require("./routes/clientes.routes"));
app.use("/usuarios", require("./routes/usuarios.routes"));
app.use("/estados", require("./routes/estados.routes"));
+app.use("/transporte", require("./routes/transporte.routes"));
app.use("/entregas", require("./routes/entregas.routes"));

// Iniciar servidor
app.listen(5000, () => {
  console.log("🚀 Servidor API en http://localhost:5000");
});
