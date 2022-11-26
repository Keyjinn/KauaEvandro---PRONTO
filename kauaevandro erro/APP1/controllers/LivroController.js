// aqui ficam as funções

const LivroModel = require("../models/LivroModel");

class LivroController{
   
    static async relatorio(req,res){
        const listaLivros = await LivroModel.find();
        res.render("livro/relatorio", {listaLivros});
    }


    static async listar(req, res){
        const salvo = req.query.s;
        const removido = req.query.r;
        const listaLivros = await LivroModel.find();
        res.render("livro/listar", {listaLivros, salvo, removido});
    };

    static async cadastrarGet(req, res){
        const cod = req.params.codigo;
        let livro={};
        let escondido= "";
        if (cod){
         livro = await LivroModel.findOne({codigo: cod});
         escondido = "hidden";
        }
        
        res.render("livro/cadastrar", {livro, escondido});
    };

    static async cadastrarPost(req, res){
        const livro = req.body;
        //atualização
        if(livro.id){
            await LivroModel.findOneAndUpdate({codigo: livro.codigo}, 
            {
                nome:livro.nome,
                preco: livro.preco
                
                
            
        });
            res.redirect("/livro?s=3")

        } else{//cadastro

            const novoLivro = new LivroModel({
            codigo: livro.codigo,
            nome: livro.nome,
            preco: livro.preco
        });
        await novoLivro.save();
        res.redirect("/livro?s=1");
      }
    }

    static async detalhar(req, res){
        const cod = req.params.codigo;
        const resultado = await LivroModel.findOne({codigo: cod});
        res.render("livro/detalhar", {resultado});
    };

    static async remover(req,res){
        const cod = req.params.codigo;
        await LivroModel.findOneAndDelete({codigo: cod});
        res.redirect("/livro?r=1");
    };

}

module.exports = LivroController;