//importar o Model
import Disco from '../models/disco.js'

export default class DiscoController {

    constructor(caminhoBase = 'adm/disco/') {
        this.caminhoBase = caminhoBase

        this.openAdd = async (req, res) => {
            res.render(caminhoBase + "add")
        }
        this.add = async (req, res) => {
            //cria o Disco
            await Disco.create({
                titulo: req.body.titulo,
                artista: req.body.artista,
                genero: req.body.genero,
                ano: req.body.ano,
                preco: req.body.preco,
                img: req.file.buffer
            });
            res.redirect('/' + caminhoBase + 'add');
        }
        this.list = async (req, res) => {
            const resultado = await Disco.find({})
            res.render(caminhoBase + 'lst', { Discos: resultado })
        }
        this.find = async (req, res) => {
            const filtro = req.body.filtro;
            const resultado = await Disco.find({
                titulo: { $regex: filtro, $options: "i" } // Alterado para titulo pois o modelo usa titulo, não nome
            })
            res.render(this.caminhoBase + 'lst', { Discos: resultado })
        }

        this.openEdt = async (req, res) => {
            // CORREÇÃO: Buscar o disco pelo ID e passar para a view
            const id = req.params.id
            const disco = await Disco.findById(id)
            res.render(caminhoBase + "edt", { Disco: disco })
        }

        this.edt = async (req, res) => {
            // Se houver upload de nova imagem, precisamos tratar, 
            // mas por enquanto mantemos a lógica básica de update
            const updateData = { ...req.body };
            if (req.file) {
                updateData.img = req.file.buffer;
            }
            
            await Disco.findByIdAndUpdate(req.params.id, updateData)
            res.redirect('/' + caminhoBase + 'lst');
        }

        this.del = async (req, res) => {
            await Disco.findByIdAndDelete(req.params.id)
            res.redirect('/' + caminhoBase + 'lst');
        }
    }
}