const express = require("express");
const router = express.Router();
const pool = require("../db");
const {
  validaDadosProduto,
  buscaTodosProdutos,
  buscaProdutoPorId,
} = require("../middlewares/produtoMiddleware");

router.get("/", buscaTodosProdutos, (req, res) => {
  res.render("produtos");
});

router.get("/novo", (req, res) => {
  res.render("novo-produto");
});

router.post("/add", validaDadosProduto, async (req, res) => {
  const { nome, preco } = req.body;
  try {
    await pool.query("INSERT INTO produtos (nome, preco) VALUES (?, ?)", [
      nome,
      preco,
    ]);
    res.redirect("/produtos");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao inserir produto.");
  }
});

router.get("/detalhe/:id", buscaProdutoPorId, (req, res) => {
  res.render("detalhe-produto");
});

module.exports = router;
