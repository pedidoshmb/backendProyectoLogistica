const express = require("express");
const router = express.Router();
const transporteController = require("../controllers/transporte.controller");

// Rutas transporte
router.get("/", transporteController.getAllTransporte);
router.get("/:id", transporteController.getTransporteById);
router.post("/", transporteController.createTransporte);
router.put("/:id", transporteController.updateTransporte);
router.delete("/:id", transporteController.deleteTransporte);

module.exports = router;
