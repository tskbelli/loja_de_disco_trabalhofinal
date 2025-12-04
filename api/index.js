
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

// Caminho correto das views e public
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);
app.use('/', lojaRoutes); 

// Servir arquivos estáticos
app.use(express.static(join(__dirname, '../public')));
app.set('views', join(__dirname, '../views'));

// Rotas
app.use('/', lojaRoutes); 
app.use (clienteRoutes)
app.use(discoRoutes)
app.use(estoqueRoutes)
app.use(pedidoRoutes)
app.use(routes)
app.listen(3001)
// Exporta o handler compatível com Vercel
export default app;
