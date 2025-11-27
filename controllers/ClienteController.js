//importar o Model
import Cliente from '../models/cliente.js'

export default class ClienteController{

    constructor(caminhoBase='adm/cliente/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Cliente
           
            await Cliente.create({
                nome: req.body.nome,
                email:req.body.email,
                endereco:req.body.endereco,
                cidade:req.body.cidade,
                estado:req.body.estado,
                cpf:req.body.cpf,
                data:req.body.data
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Cliente.find({})
            res.render(caminhoBase + 'lst', {Cliente:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Cliente.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Cliente:resultado})
        }

     

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const cliente = await Cliente.findById(id) 
            console.log(cliente)
            res.render(caminhoBase + "edt", 
                {Cliente:cliente})
        }


        this.edt = async(req, res)=>{
        await Cliente.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Cliente.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}