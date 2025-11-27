import conexao from '../config/conexao.js'

const Estoque = conexao.Schema({

    quantidade:{type:Number, required:true},
    localizacao: {type:String, required:true},
    disco: {type:String, required:true}

   
})

export default conexao.model('Estoque',Estoque)
