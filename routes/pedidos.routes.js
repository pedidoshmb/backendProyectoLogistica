const express = require("express");
const router = express.Router();
const pedidosController = require("../controllers/pedidos.controller");
const authenticateToken = require("../middlewares/auth");

// Proteger todas las rutas de pedidos
router.use(authenticateToken);

// Rutas de pedidos
router.get("/", pedidosController.getAllPedidos);
router.get("/:id", pedidosController.getPedidoById);
router.post("/", pedidosController.createPedido);
router.put("/:id", pedidosController.updatePedido);
router.delete("/:id", pedidosController.deletePedido);

module.exports = router;
