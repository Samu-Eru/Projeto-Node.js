import express from "express";
import LivroController from "../controllers/livrosController.js";

const router = express.Router();

router
.get("/livros", LivroController.ObterLivros)
.get("/livros/busca", LivroController.ObterPorEditora)
.post("/livros", LivroController.CadastrarLivro)
.put("/livros", LivroController.AlterarLivro)
.get("/livros/:id", LivroController.ObterLivroPorId)
.delete("/livros/:id", LivroController.DeletarLivro)

export default router;