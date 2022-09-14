const { json } = require('body-parser')
const { where } = require('sequelize')
const database = require('../models')

class PessoaController {
    static async ObterTodos(req, res) {
        try {
            const todasAsPessoas = await database.Pessoas.findAll()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async ObterPorID(req, res) {
        const { id } = req.params
        try {
            const pessoa = await database.Pessoas.findOne({ where: { id: Number(id) } })
            return res.status(200).json(pessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async Cadastrar(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async Alterar(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await database.Pessoas.update(novasInfos, { where: { id: Number(id) } })
            const pessoaAtualizada = await database.Pessoas.findOne({ where: { id: Number(id) } })
            return res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async Deletar(req, res) {
        const { id } = req.params
        try {
            await database.Pessoas.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: `id ${id} deletado!` })
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



    static async ObtenMatriculaPorID(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            const matricula = await database.Matriculas.findOne({ where: { id: Number(matriculaId), estudante_id: Number(estudanteId) } })
            return res.status(200).json(matricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async CadastrarMatricula(req, res) {
        const { id } = req.params
        const novasInfos = { ...req.body, estudante_id: Number(id) }
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novasInfos)
            return res.status(200).json(novaMatriculaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async AlterarMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        const novasInfos = req.body
        try {
            await database.Matriculas.update(novasInfos, { where: { id: Number(matriculaId), estudante_id: Number(estudanteId) } })
            const MatriculaAtualizada = await database.Matriculas.findOne({ where: { id: Number(matriculaId) } })
            return res.status(200).json(MatriculaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async DeletarMatriculas(req, res) {
        const { id } = req.params
        try {
            await database.Matriculas.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: `id ${id} deletado!` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}
module.exports = PessoaController