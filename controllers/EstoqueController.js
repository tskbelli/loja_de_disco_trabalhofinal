//importar o Model
import Estoque from '../models/estoque.js'

export default class EstoqueController{

    constructor(caminhoBase='adm/estoque/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Estoque
           
            await Estoque.create({
                quantidade: req.body.quantidade,
                localizacao:req.body.localizacao,
                disco:req.body.disco
                
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Estoque.find({})
            res.render(caminhoBase + 'lst', {Estoques:resultado})
        }

          this.find = async(req, res)=>{
                    const filtro = req.body.filtro;
                    const resultado = await Disco.find({
                        nome: { $regex: filtro, $options: "i"}
                    })
                    res.render(this.caminhoBase + 'lst', {Estoques: resultado})
                }


         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id

            const cliente = 
            res.render(caminhoBase + "edt")
        }

        this.edt = async(req, res)=>{
        await Estoque.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Estoque.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }


    }
}
