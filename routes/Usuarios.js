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
                mensagemErro: i
            })
        })
    }
);
//criar usuario
router.post(
    "/add",
    (req,res)=>{
        let {nome,email} = req.body;
        if(!nome){
            res.json({status:400,mensagemErro: "O nome é obrigatorio"})
        }
        if(!email){
            res.json({status:400,mensagemErro: "O email é obrigatorio"})
        }
        Usuario.create(
            {
                nome,
                email
            }
        ).then(
            i=> {
                res.json(
                    {
                        status:200,
                        mensagemFeedback:"Usuario criado com sucesso"
                    }
                )
            }
        ).catch(i=>{
            res.send({
                status:400,
                mensagemErro: i
            })
        })
    }
)

router.delete(
    "/delete/:id",
    (req,res)=>{
        
    }
)

module.exports = router;