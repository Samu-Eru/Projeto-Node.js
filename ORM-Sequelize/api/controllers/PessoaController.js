// const Sequelize = require('sequelize')
// const database = require('../models')

const { PessoasServices } = require('../services')
const pessoasServices = new PessoasServices()

class PessoaController {

    static async ObterTodosAtivos(req, res) {
        try {
            const todasAsPessoasAtivas = await pessoasServices.ObterRegistrosAtivos()
            return res.status(200).json(todasAsPessoasAtivas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async ObterTodos(req, res) {
        try {
            const todasAsPessoas = await pessoasServices.ObterTodos()
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

    static async RestaurarRegistroMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.restore({ where: { id: Number(matriculaId), estudante_id: Number(estudanteId) } })
            return res.status(200).json({ mensagem: `id ${matriculaId} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async ObterMatriculas(req, res) {
        const { estudanteId } = req.params
        try {
            const pessoa = await database.Pessoas.findOne({ where: { id: Number(estudanteId) } })
            const matriculas = await pessoa.getTeste()
            return res.status(200).json({ matriculas })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async ObterMatriculasPorTurma(req, res) {
        const { turmaId } = req.params
        try {
            const todasAsMatriculas = await database.Matriculas.findAndCountAll({ where: { turma_id: Number(turmaId), status: 'confirmado' }, limit: 5 })
            return res.status(200).json(todasAsMatriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async ObterTurmasLotadas(req, res) {
        const lotacaoTurma = 2
        try {
            const turmasLotadas = await database.Matriculas
                .findAndCountAll({
                    where: {
                        status: 'confirmado'
                    },
                    attributes: ['turma_id'],
                    group: ['turma_id'],
                    having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
                    //-----------------------------------------------------------------------------------------
                })
            return res.status(200).json(turmasLotadas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async CancelarMatricula(req, res) {
        const { estudanteId } = req.params
        try {
            await pessoasServices.CancelaPessoaEMatriculas(Number(estudanteId))
            return res.status(200).json({ message: `matrículas ref. estudante ${estudanteId} canceladas!` })
        }
        catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController