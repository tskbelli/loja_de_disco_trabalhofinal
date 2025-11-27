import conexao from '../config/conexao.js'

const Cliente = conexao.Schema({
    nome: {type:String, required:true},
    email:{type:String, required:true},
    endereco:{type:String, required:true},
    cidade:{type:String, required:true},
    estado:{type:String, required:true},
    cpf:{type:String, required:true},
    data:{type:Date, required:true}
})

export default conexao.model('Cliente',Cliente)