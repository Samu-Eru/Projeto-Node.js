import express from "express";
import AutorController from "../controllers/autoresController.js";

const router = express.Router();

router
.get("/autores", AutorController.Obterautores)
.post("/autores", AutorController.CadastrarAutor)
.put("/autores", AutorController.AlterarAutor)
.get("/autores", AutorController.ObterAutorPorId)
.delete("/autores", AutorController.DeletarAutor)

export default router;