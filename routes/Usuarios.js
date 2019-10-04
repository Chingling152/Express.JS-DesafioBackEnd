const express = require('express');//importa express.js
const router = express.Router();

const Usuario = require('../models/Usuario')//importa os modelos do usuario 

//listar usuarios
router.get(
    "/",
    (req,res)=>{
        Usuario
        .findAll()
        .then(j=>{res.json(j)})
        .catch(i=>res.status(400).send({mensagemErro: i.errors[0].message || i}))
    }
);
//criar usuario
router.post(
    "/cadastrar",
    (req,res)=>{
        const {nome,email,privilegio} = req.body;
        if(!nome){
           res.json({status:400,mensagemErro: "O nome é obrigatorio"})
        }else
        if(!email){
            res.json({status:400,mensagemErro: "O email é obrigatorio"})
        }
        else
        if(!privilegio){
            res.json({status:400,mensagemErro: "O nivel privilegio do usuario obrigatorio"})
        }
        else
        if(privilegio >2 || privilegio <1){
            res.json({mensagemErro: "Unicos niveis de privilegio aceito são\n1 - Usuario comum\n2 - Lojista"})
        }
        else{
            Usuario.create({nome,email,privilegio})
            .then(i=> res.json({mensagemFeedback:"Usuario criado com sucesso"}) )
            .catch(i=>res.send({mensagemErro: i.errors[0].message || i}) )
        }
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
                    res.status(404).send({mensagemFeedback:`Não existe usuario com ID ${id}`});
                }
            })
            .catch(i=>res.status(400).json( {mensagemFeedback: i.errors[0].message || i} ) );
        }
    }
)

module.exports = router;