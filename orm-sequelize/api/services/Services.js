const { where } = require('sequelize')
const database = require('../models')

class Services {
    constructor(modelName) {
        this.modelName = modelName
    }

    async ObterTodos() {
        return database[this.modelName].findAll()
    }

    async ObterPorID(id){

    }

    async Cadastrar(dados){

    }

    async Alterar(dadosAtualizados, id, transacao = {}){
        return database[this.modelName].update(dadosAtualizados, { where:{ id:id }}, transacao)
    }

    async AlterarRegistros(dadosAtualizados, where, transacao = {}){
        return database[this.modelName].update(dadosAtualizados, { where:{ ...where }}, transacao)
    }
    async Deletar(id){

    }
}

module.exports = Services