
 export default class GeralController {
 
    constructor() {
        this.home = async (req, res) => {
          res.render('adm/index')
        };

        this.teste = async (req, res) => {
          const resultado = "teste";
          res.render('adm/index2',{teste: resultado});
        };

        this.formulario = async (req, res) => {
          res.render('adm/index')
        };

    }
 }

