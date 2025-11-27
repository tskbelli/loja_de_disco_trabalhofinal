import Disco from '../models/disco.js';

export default class LojaController {
    constructor() {
        // Simulação de sessão em memória (igual ao projeto de referência)
        this.carrinho = []; 
        this.meusDiscos = [];

        // --- VIEWS ---

        // 1. Catálogo (Home da Loja)
        this.catalogo = async (req, res) => {
            try {
                const discos = await Disco.find({});
                
                res.render('loja/indexloja', { 
                    discos: discos,
                    carrinho: this.carrinho,
                    meusDiscos: this.meusDiscos
                });
            } catch (error) {
                console.log(error);
                res.status(500).send("Erro ao carregar catálogo.");
            }
        }

        // 2. Carrinho
        this.verCarrinho = async (req, res) => {
            try {
                // Busca os detalhes apenas dos discos que estão no array de IDs do carrinho
                const discosNoCarrinho = await Disco.find({ _id: { $in: this.carrinho } });
                const total = discosNoCarrinho.reduce((acc, disco) => acc + disco.preco, 0);

                res.render('loja/carrinho', { 
                    discos: discosNoCarrinho, 
                    total: total 
                });
            } catch (error) {
                res.status(500).send("Erro ao carregar carrinho.");
            }
        }

        // 3. Meus Discos (Biblioteca)
        this.verMeusDiscos = async (req, res) => {
            try {
                const discosComprados = await Disco.find({ _id: { $in: this.meusDiscos } });
                
                res.render('loja/colecao', { discos: discosComprados });
            } catch (error) {
                res.status(500).send("Erro ao carregar sua coleção.");
            }
        }

        // --- AÇÕES ---

        this.adicionarAoCarrinho = (req, res) => {
            const { id } = req.params;
            // Evita duplicatas e itens já comprados
            if (!this.carrinho.includes(id) && !this.meusDiscos.includes(id)) {
                this.carrinho.push(id);
            }
            res.redirect('/loja/carrinho');
        }

        this.removerDoCarrinho = (req, res) => {
            const { id } = req.params;
            this.carrinho = this.carrinho.filter(itemId => itemId !== id);
            res.redirect('/loja/carrinho');
        }

        this.finalizarCompra = (req, res) => {
            // Move itens do carrinho para "Meus Discos"
            this.carrinho.forEach(id => {
                if (!this.meusDiscos.includes(id)) {
                    this.meusDiscos.push(id);
                }
            });
            this.carrinho = []; // Limpa o carrinho
            res.redirect('/loja/colecao');
        }
    }
}