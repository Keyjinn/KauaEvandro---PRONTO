
const AtendenteModel = require("../models/AtendenteModel");
const bcryptjs = require ("bcryptjs");

class AtendenteController{

    static async relatorio(req,res){
        const listaAtendente = await AtendenteModel.find();
        res.render("atendente/relatorio", {listaAtendente});
    }

    
    static async listar(req, res){
        const salvo = req.query.s;
        const removido = req.query.r;
        const listaAtendente = await AtendenteModel.find();
        res.render("atendente/listar", {listaAtendente, salvo, removido});
    };

    static async cadastrarGet(req, res){
        const email = req.params.email;
        const erro = req.query.s;
        let atendente={};
        let escondido= ""
        if (email){
         atendente = await AtendenteModel.findOne({email: email});
         escondido = "hidden";
        }
        
        res.render("atendente/cadastrar", {atendente, escondido, erro});
    };

    static async cadastrarPost(req, res){
        const atendente = req.body;
        //atualização
        if(atendente.id){
            const salt = bcryptjs.genSaltSync();
            const hash = bcryptjs.hashSync(atendente.senha, salt);

            await AtendenteModel.findOneAndUpdate({email: atendente.email}, 
            {
                nome:atendente.nome,
                senha: hash
            
            });
            res.redirect("/atendente?s=3");
        } else{//cadastro

            const resultado = await AtendenteModel.findOne({email: atendente.email});
            if(resultado){
               
                res.redirect("/atendente/cadastrar?e=1");
            }

            else{

                const salt = bcryptjs.genSaltSync();
                const hash = bcryptjs.hashSync(atendente.senha, salt);

                const novoAtendente = new AtendenteModel({

                  nome: atendente.nome,
                  email:atendente.email,
                  senha: hash
            });
            await novoAtendente.save();
            res.redirect("/atendente?s=1");
            }
        }
    };

    static async detalhar(req, res){
        const email = req.params.email;
        const resultado = await AtendenteModel.findOne({email: email});
        res.render("atendente/detalhar", {resultado});
    };

    static async remover(req,res){
        const email = req.params.email;
        await AtendenteModel.findOneAndDelete({email: email});
        res.redirect("/atendente?r=1");
    };

    static async login(req,res){
        if(req.session.atendente){
            res.redirect("/");
        }else{
          const erro = req.query.e;
        res.render("atendente/login", ({erro}));

      }
    }

    static async loginpost(req,res){
        const atendente= req.body;
        const resultado = await AtendenteModel.findOne({email: atendente.email});
        if(resultado){//encontrou email
           if (bcryptjs.compareSync(atendente.senha, resultado.senha)){//senha confere
                req.session.atendente = resultado.email;
                res.redirect("/");
            }else{//senha incorreta
                res.redirect("/atendente/login?e=1");
            }
        
            
        }else{//email nao encontrado
            res.redirect("/atendente/login?e=1");
        }


    }

    static async logout(req,res){
        req.session.atendente =undefined;
        res.redirect("/atendente/login");

    }


  

}

module.exports = AtendenteController;