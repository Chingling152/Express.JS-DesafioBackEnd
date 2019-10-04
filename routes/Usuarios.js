const express = require('express');//importa express.js
const router = express.Router();

const Usuario = require('../models/Usuario')//importa os modelos do usuario 

//listar usuarios
router.get(
    "/",
    (req,res)=>{
        Usuario
        .findAll()
        .then(j=>{
            res.json(j)
        })
        .catch(i=>{
            res.send({
                status:400,
                mensagemErro: i.errors[0].message || i
            })
        })
    }
);
//criar usuario
router.post(
    "/add",
    (req,res)=>{
        const {nome,email,privilegio} = req.body;
        if(!nome){
           res.json({status:400,mensagemErro: "O nome é obrigatorio"})
       }
       if(!email){
           res.json({status:400,mensagemErro: "O email é obrigatorio"})
       }
       if(!privilegio){
           res.json({status:400,mensagemErro: "O nivel privilegio do usuario obrigatorio"})
       }
       if(privilegio >2 || privilegio <1){
        res.json({status:400,mensagemErro: "Unicos niveis de privilegio aceito são\n1 - Usuario comum\n2 - Lojista"})
       }
        Usuario.create({nome,email,privilegio})
        .then(i=> res.json({status:200,mensagemFeedback:"Usuario criado com sucesso"}) )
        .catch(i=>res.send({status:400,mensagemErro: i.errors[0].message || i}) )
    }
)
//listar por ID
router.get(
    "/:id",
    (req,res)=>{
        var {id} = req.params
        if(id){
            Usuario.findByPk(id)
            .then(i=>{
                if(i){
                    res.json(i)
                }else{
                    res.status(404).send({status:400,mensagemFeedback:`Não existe usuario com ID ${id}`});
                }
            })
            .catch(i=>res.json( {status:400,mensagemFeedback: i.errors[0].message || i} ) );
        }
    }
)

module.exports = router;