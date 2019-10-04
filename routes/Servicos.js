const express = require('express');
const router = express.Router();

const Servico = require('../models/Servico')

router.get(
    "/",
    (req,res)=>{
        Servico
        .findAll()
        .then(j=>res.json(j))
        .catch(i=> res.status(400).send({status:400,mensagemErro: i.errors[0].message || i}))
    }
);

router.post(
    "/add",
    (req,res)=>{
        let {titulo,descricao,vagas,horarioInicio,horarioFim,prestador} = req.body;
        if(!titulo){
            res.json({status:400,mensagemErro: "O titulo é obrigatorio"})
        }
        if(!vagas){
            res.json({status:400,mensagemErro: "O numero de vagas é obrigatorio"})
        }
        if(!horarioInicio){
            res.json({status:400,mensagemErro: "O horario inicial em que o serviço ficará disponivel é obrigatorio"})
        }
        if(!horarioFim){
            res.json({status:400,mensagemErro: "O horario final em que o serviço ficará disponivel é obrigatorio"})
        }
        if(!prestador){
            res.json({status:400,mensagemErro: "O ID do prestador desse serviço é obrigatorio"})
        }
        
        Servico
            .create({titulo,descricao,vagas,horarioInicio,horarioFim,prestador})
            .then(i=> res.json({status:200,mensagemFeedback:"Serviço cadastrado com sucesso"}))
            .catch(i=> res.status(400).send({status:400,mensagemErro: i.errors[0].message || i}))
    }
)

router.get(
    "/list-by-user/:id",
    (req,res)=>{
        var {id} = req.params
        if(id){
            Servico.findAll({where:{prestador:parseInt(id)}})
            .then(
                i=>{
                    res.json(i)
                }
            )
            .catch(i=> res.status(400).send({status:400,mensagemErro: i.errors[0].message || i}))
        }
    }
)

module.exports = router;