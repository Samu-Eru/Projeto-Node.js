const { json } = require('body-parser')
const { where } = require('sequelize')
const database = require('../models')

class TurmaController {
    static async ObterTodasTurmas(req, res) {
        try {
            const todasAsTurmas = await database.Turmas.findAll()
            return res.status(200).json(todasAsTurmas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async ObterTurmaPorId(req,res) {
        const {id} = req.params
        try {
            const turma = await database.Turmas.findOne( {where: {id: Number(id)} })
            return res.status(200).json(turma)
        } catch (error) {
            return res.status(200).json(error.message)
        }
    }

    static async Cadastrar(req,res) {
        const novoCadastro = req.body
        try {
            const infos = await database.Turmas.create(novoCadastro)
            return res.status(200).json(infos)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async Alterar(req,res){
        const novasInfos = req.body
        const {id} = req.params
        try {
            await database.Turmas.update(novasInfos, {where: {id: Number(id)}})
            const turma = await database.Turmas.findOne({where:{id: Number(id)}})
            return res.status(200).json(turma)
        } catch (error) {
            return res.status(200).json(error.message)
        }
    }
    
    static async Deletar(req,res) {
        const {id} = req.params
        try {
            await database.Turmas.destroy({where: {id: Number(id) }})
            return res.status(200).json({mensagem: `id ${id} deletado!`})
        } catch (error) {
            return res.status(500).json(error.message)
                    }
    }

}

module.exports=TurmaController