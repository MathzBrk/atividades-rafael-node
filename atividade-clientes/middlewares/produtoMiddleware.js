const pool = require("../db");

const validaDadosProduto = (req, res, next) => {
  const { nome, preco } = req.body;
  if (!nome || !preco) {
    return res.render("novo-produto", {
      error: "Todos os campos são obrigatórios!",
    });
  }
  if (isNaN(preco) || Number(preco) <= 0) {
    return res.render("novo-produto", {
      error: "O preço deve ser um número válido e positivo.",
    });
  }
  next();
};

const buscaTodosProdutos = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM produtos");
    res.locals.produtos = rows;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar produtos.");
  }
};

const buscaProdutoPorId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM produtos WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).send("Produto não encontrado");
    }
    res.locals.produto = rows[0];
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar o produto.");
  }
};

module.exports = {
  validaDadosProduto,
  buscaTodosProdutos,
  buscaProdutoPorId,
};
