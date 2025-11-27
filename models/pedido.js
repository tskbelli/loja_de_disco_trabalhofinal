import conexao from '../config/conexao.js'

const Pedido = conexao.Schema({
    data_pedido:{type:Date, required:true},
    valor_total: {type:Number, required:true},
    forma_pagamento:{type:String, required:true},
    cliente:{type:String, required:true}
   
})

export default conexao.model('Pedido',Pedido)
