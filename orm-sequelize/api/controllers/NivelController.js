const { json } = require('body-parser')
const { where } = require('sequelize')
const database = require('../models')

class NivelController {
    static async ObterTodosNiveis(req, res) {
        try {
            const todosOsNiveis = await database.Niveis.findAll()
            return res.status(200).json(todosOsNiveis)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async ObterNiveisPorID(req, res) {
        const {id} = req.params 
        try {
            const nivel = await database.Niveis.findOne( {where: {id: Number(id)} })
            return res.status(200).json(nivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async Cadastrar(req,res) {
        const novoNivel = req.body
        try {
            const novoNivelCriado = await database.Niveis.create(novoNivel)
            return res.status(200).json(novoNivelCriado)
                    } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async Alterar(req,res) {
        const {id} = req.params
        const novasInfos= req.body
        try {
            await database.Niveis.update(novasInfos, {where: { id: Number(id) }})
            const nivelAtualizado = await database.Niveis.findOne( {where: {id: Number(id)}})            
            return res.status(200).json(nivelAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async Deletar(req,res) {
        const {id} = req.params
        try {
            await database.Niveis.destroy({where: {id: Number(id) }})
            return res.status(200).json({mensagem: `id ${id} deletado!`})
        } catch (error) {
            return res.status(500).json(error.message)
                    }
    }

    static async RestaurarRegistro(req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.restore({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: `id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}


module.exports = NivelController