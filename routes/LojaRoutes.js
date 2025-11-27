import express from 'express';
const router = express.Router();
import LojaController from '../controllers/LojaController.js';

const controller = new LojaController();

// Views Principais
router.get('/', controller.catalogo); // Home agora é o catálogo da loja
router.get('/loja/catalogo', controller.catalogo);
router.get('/loja/carrinho', controller.verCarrinho);
router.get('/loja/meus-discos', controller.verMeusDiscos);

// Ações
router.get('/loja/adicionar/:id', controller.adicionarAoCarrinho);
router.get('/loja/remover/:id', controller.removerDoCarrinho);
router.post('/loja/comprar', controller.finalizarCompra);

export default router;