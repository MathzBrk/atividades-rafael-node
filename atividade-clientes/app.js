require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

// Importa as rotas
const produtosRoutes = require("./rotas/produtosRoutes");
const clientesRoutes = require("./rotas/clientesRoutes");

// Configura o EJS como view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Middlewares
app.use(express.static("public")); // Serve arquivos da pasta 'public'
app.use(express.urlencoded({ extended: true })); // Para ler dados de formulários

// Monta as rotas
app.use("/produtos", produtosRoutes);
app.use("/clientes", clientesRoutes);

// Rota principal (já servida automaticamente pelo express.static se houver um index.html)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
