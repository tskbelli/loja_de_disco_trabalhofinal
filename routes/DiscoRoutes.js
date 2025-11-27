import express from 'express';
const router = express.Router();
//Busca o AlunoController
import DiscoController from '../controllers/DiscoController.js'
const controle = new DiscoController();
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const caminhobase = 'adm/disco/'

router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add', upload.single('img'), controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
router.post('/' + caminhobase + 'lst', controle.find)
router.get('/' + caminhobase + 'del/:id', controle.del)
router.get('/' + caminhobase + 'edt/:id', upload.single('img'), controle.openEdt)
router.post('/' + caminhobase + 'edt/:id', controle.edt)

export default router
