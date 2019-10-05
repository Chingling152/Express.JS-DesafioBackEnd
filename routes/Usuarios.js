const express = require('express');//importa express.js
const router = express.Router();
require('dotenv').config();
var jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuario')//importa os modelos do usuario 
 //process.env.CHAVE_TOKEN
 
//listar usuarios
router.get(
    "/",
    (req,res)=>{
        var token = req.headers['x-access-token'];
        
        if(!token){
            return res.status(401).end()
        }else{
            jwt.verify(token, process.env.CHAVE_TOKEN,(err,decoded)=>{
                if(err)return res.status(500).json({mensagemErro:"erro ao autenticar token"})
                if(decoded.privilegio != 2)res.status(403).end()
                Usuario
                    .findAll({attributes: ['id','nome', 'email']})
                    .then(j=>{res.json(j)})
                    .catch(i=>res.status(400).send({mensagemErro: i.errors[0].message || i}))
            })
        }
    }
);
//criar usuario
router.post(
    "/cadastrar",
    (req,res)=>{
        const {nome,email,senha,privilegio} = req.body;
        if(!nome){
            res.status(400).json({mensagemErro: "O nome é obrigatorio"})
        }else
        if(!email){
            res.status(400).json({mensagemErro: "O email é obrigatorio"})
        }else
        if(!senha){
            res.status(400).json({status:400,mensagemErro: "A senha é obrigatoria"})
        }
        else
        if(!privilegio){
            res.status(400).json({status:400,mensagemErro: "O nivel privilegio do usuario obrigatorio"})
        }
        else
        if(privilegio >2 || privilegio <1){
            res.status(400).json({mensagemErro: "Unicos niveis de privilegio aceito são\n1 - Usuario comum\n2 - Lojista"})
        }
        else{
            Usuario.create({nome,email,privilegio,senha})
            .then(i=> res.json({mensagemFeedback:"Usuario criado com sucesso"}) )
            .catch(i=>res.status(400).send({mensagemErro: i.errors[0].message || i}) )
        }
    }
)

router.post(
    "/login",
    (req,res)=>{
        const {email,senha} = req.body;

        if(!email){
            res.status(400).json({mensagemErro: "O email é obrigatorio"})
        }else
        if(!senha){
            res.status(400).json({mensagemErro: "A senha é obrigatoria"})
        }else{
            Usuario
                .findAll({limit:1,where: { email,senha },raw: true})
                .then(
                    us=>{
                        if(!us){
                            res.status(400).json({mensagemErro: "Email e/ou senha incorretos"})
                        }else{
                            var token = jwt.sign(
                                { id:us[0].id , privilegio: us[0].privilegio }, 
                                process.env.CHAVE_TOKEN, {expiresIn: 600}
                            );
                            res.status(200).json({ auth: true, token: token });
                        }
                    }
                )
                .catch(i=> {
                    console.log(i)
                    res.status(400).send({mensagemErro: i.errors[0].message || i})
                })
        }
    }
)

module.exports = router;