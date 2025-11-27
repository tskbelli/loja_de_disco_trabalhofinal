import conexao from '../config/conexao.js'

const Disco = conexao.Schema({
    titulo: {type:String, required:true},
    artista:{type:String, required:true},
    genero:{type:String, required:true},
    ano:{type:Number, required:true},
    preco:{type:Number, required:true},
    img:{type:Buffer, required:false,
    get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
    }}
})

export default conexao.model('Disco',Disco)