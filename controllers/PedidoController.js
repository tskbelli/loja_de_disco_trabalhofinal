
//importar o Model
import Pedido from '../models/pedido.js'

export default class PedidoController{

    constructor(caminhoBase='adm/pedido/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Pedido
           
            await Pedido.create({
                data_pedido: req.body.data_pedido,
                valor_total:req.body.valor_total,
                forma_pagamento:req.body.forma_pagamento,
                cliente:req.body.cliente
                
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Pedido.find({})
            res.render(caminhoBase + 'lst', {Pedidos:resultado})
        }
          this.find = async(req, res)=>{
                    const filtro = req.body.filtro;
                    const resultado = await Pedido.find({
                        nome: { $regex: filtro, $options: "i"}
                    })
                    res.render(this.caminhoBase + 'lst', {Pedidos: resultado})
                }


         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const pedido = await Pedido.findById(id) 
            console.log(pedido)
            res.render(caminhoBase + "edt", 
                {Pedido:pedido})
        }


        this.edt = async(req, res)=>{
        await Pedido.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Pedido.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}
