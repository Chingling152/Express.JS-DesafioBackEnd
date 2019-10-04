const express = require('express');
const router = express.Router();

const Agendamento = require('../models/Agendamento')
const Usuario = require('../models/Usuario')
const Servico = require('../models/Servico') 

router.get(
    '/',
    (req,res)=>{
        Agendamento.
        findAll({include:[Usuario,Servico]})
        .then(i=> res.json(i))
        .catch(i=> res.status(400).json({mensagemErro: i.errors[0].message || i}))
    }
)

//listar por cliente
router.get(
    '/por-usuario/:id',
    (req,res)=>{
        const {id} = req.params;
        
        Agendamento
            .findAll({
                include:[Servico],
                where:{
                    cliente:parseInt(id)
                }
            })
            .then(
                age=>{
                    if(!age){
                        res.status(404).json({mensagemErro: `Nenhum agendamento feito pelo usuario com ID ${id}`})
                    }else{
                        res.json({age})
                    }
                }
            )
            .catch(i=> res.status(400).json({mensagemErro: i.errors[0].message || i}))
    }
);
//listar por serviço
router.get(
    '/por-servico/:id',
    (req,res)=>{
        const {id} = req.params;
        console.log(id)
        Agendamento
            .findAll({
                include:[Usuario],
                where:{
                    servico:parseInt(id)
                }
            })
            .then(
                age=>{
                    if(!age){
                        res.status(404).json({mensagemErro: `Nenhum agendamento pro serviço ${id}`})
                    }else{
                        res.json(age)
                    }
                }
            )
            .catch(i=> res.status(400).json({mensagemErro: i.errors[0].message || i}))
    }
);

//listar por dia
router.get(
    '/por-servico/:id/por-data',
    (req,res)=>{
        const {id} = req.params;
        let {ano,mes,dia} = req.query;
        if(!ano || !mes || !dia){
            res.status(400).json({dataInvalida:"Insira uma data valida"})
        }else{
            var dataAgendada = new Date(parseInt(ano),parseInt(mes-1),parseInt(dia))
            Agendamento.
            findAll(
                {
                    include:[Usuario,Servico],
                    where:{dataAgendada,servico:parseInt(id)}
                }
            )
            .then(age=> {
                if(!age){
                    res.status(404).json({mensagemErro: `Nenhum agendamento pro serviço ${id} na data ${dataAgendada}`})
                }else{
                    res.json(age)
                }
            })
            .catch(i=> res.status(400).json({mensagemErro: i.errors[0].message || i}))
        }
    }
)
//criar serviço
router.post(
    '/cadastrar',
    (req,res)=>{
        var {dataAgendada,horario,servico,cliente} = req.body
        var numeroVaga = 0;//vaga numero 0 por padrão 
        //verificar se usuario existe
        Usuario
        .findByPk(cliente)
        .then(
            us=>{
                if(!us){
                    res.status(404).json({mensagemErro: `usuario no id ${cliente} não existe`})
                }
                //console.log("Validou usuario")
            }
        ).catch(erro=>{
            res.status(400).json({mensagemErro: erro.errors[0].message || erro})
        })
        //verificar se o serviço existe
        Servico
        .findByPk(servico)
        .then(
            ser=>{
                if(!ser){
                    res.status(404).json({mensagemErro: `serviço ${servico} não existe`})
                }else{
                    //console.log("Validou Serviço")
                    //converter os valores para unix pra facilitar a verificação 
                    const h = new Date(`${dataAgendada}T${horario}`).getTime()
                    const hS = new Date(`${dataAgendada}T${ser.horarioInicio}`).getTime()
                    const dur = new Date(`${dataAgendada}T${ser.horarioFim}`) - hS
                    const hF = new Date(`${dataAgendada}T${ser.horarioInicio}`).getTime() + dur //adiciona a duração (caso o horario final seja menor)
                    
                    // console.log(horario)
                    // console.log("horario atual : " +new Date(h).toJSON())
                    // console.log("horario minimo : " +new Date(hS).toJSON()) testes ;-;
                    // console.log("duração : " + new Date(dur).getTime())
                    // console.log("horario maximo : " +new Date(hF).toJSON())

                    if(h < hS || h > hF){
                        res.status(404).json({mensagemErro: `o servico "${ser.titulo}" só está disponivel das ${ser.horarioInicio.split('.')[0]} as ${ser.horarioFim.split('.')[0]}`})
                    }else{
                        //console.log("Validou horario")
                        //verificar vagas (procurando todas as vagas para esse serviço nesse mesmo dia)
                        Agendamento
                        .findAll({
                            where:{servico,dataAgendada}
                        })
                        .then(
                            age =>{
                                if(age){
                                    const quant = age.filter(t=>t.horario.split(':')[0] === horario.split(':')[0])//verifica se há uma vaga no mesmo horario
                                    //console.log("Validou vaga")
                                    if(quant.length>0){
                                        res.status(404).json({mensagemErro:"Já existe um agendamento neste horario"})
                                    }else{
                                        numeroVaga = age.length + 1;//numero da vaga
                                        //console.log(numeroVaga);

                                        if(numeroVaga > 0 && numeroVaga <= ser.vagas){//não pode exceder a quantidade de vagas
                                            Agendamento
                                                .create({numeroVaga,dataAgendada,horario,servico,cliente})//envia os dados
                                                .then(i=>res.json({mensagemFeedback:"Serviço agendado com sucesso"}))//console.log("Criou agendamento")})
                                                .catch(i=>res.status(400).json({mensagemErro: i.errors[0].message || i}))
                                        }else{
                                            res.status(404).json({mensagemErro:`Não há vagas disponiveis para "${ser.titulo}" na data ${dataAgendada}`})
                                        }
                                    }
                                }
                            }
                        )
                        .catch(k=>{
                            console.log(k);
                            res.status(400).json({mensagemErro: k.errors[0].message || k})
                        })
                    }
                }
            }
        ).catch(i=>{
            //console.log(i);
            res.status(404).json({mensagemErro: i.errors[0].message || i})
        })       
    }
);

module.exports = router;