const express = require("express");
const router = express.Router();
const entregasController = require("../controllers/entregas.controller");
const multer = require("multer");
const path = require("path");
const upload = require("../middlewares/uploadPDF.js");

// Configuración de multer para guardar PDF en /uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // nombre único
  },
});

// Filtro: solo PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos PDF"), false);
  }
};

// Rutas entregas
router.get("/", entregasController.getAllEntregas);
router.get("/:id", entregasController.getEntregaById);
router.post("/", upload.single("pdf"), entregasController.createEntrega);
router.put("/:id", upload.single("pdf"), entregasController.updateEntrega);
router.delete("/:id", entregasController.deleteEntrega);

module.exports = router;
