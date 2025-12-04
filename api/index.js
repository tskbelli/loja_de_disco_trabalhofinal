
import { createServer } from 'http';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Rotas do Admin
import routes from './routes/route.js'; 
import clienteRoutes from './routes/ClienteRoutes.js'; 
import discoRoutes from './routes/DiscoRoutes.js'; 
import estoqueRoutes from './routes/EstoqueRoutes.js';
import pedidoRoutes from './routes/PedidoRoutes.js';

// Rota da Loja (Novo)
import lojaRoutes from './routes/LojaRoutes.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, '/public')));
app.set('views', join(__dirname, '/views'));

// === DEFINIÇÃO DE ROTAS ===

// 1. Rota da Loja (Cliente) - Deve vir primeiro para capturar o "/"
app.use('/', lojaRoutes); 

// 2. Rotas do Admin
app.use(clienteRoutes);
app.use(discoRoutes);
app.use(estoqueRoutes);
app.use(pedidoRoutes);
app.use(routes);

app.listen(3001, () => {
    console.log("Servidor rodando em http://localhost:3001");
});

export default app;