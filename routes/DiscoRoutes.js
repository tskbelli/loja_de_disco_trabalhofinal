import express from 'express';
const router = express.Router();
import DiscoController from '../controllers/DiscoController.js'
const controle = new DiscoController();
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Garanta que este caminho base bata com o do Controller (adm/disco/)
const caminhobase = 'adm/disco/'

router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add', upload.single('img'), controle.add)

router.get('/' + caminhobase + 'lst', controle.list)
router.post('/' + caminhobase + 'lst', controle.find)

router.get('/' + caminhobase + 'del/:id', controle.del)

router.get('/' + caminhobase + 'edt/:id', controle.openEdt)
// AQUI ESTAVA O ERRO: Faltava o upload.single('img') nesta linha abaixo
router.post('/' + caminhobase + 'edt/:id', upload.single('img'), controle.edt)

export default router