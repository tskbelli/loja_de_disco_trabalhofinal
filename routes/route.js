import express from 'express';
const router = express.Router();
import controller from '../controllers/controller.js'
const controle = new controller();

router.get('/', controle.home)
router.get('adm/teste', controle.teste)
router.post('adm/formulario', controle.formulario)
export default router