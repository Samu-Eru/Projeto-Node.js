const Services = require('./Services')
const database = require('../models')

class PessoasServices extends Services {
    constructor() {
        super('Pessoas')
        this.matriculas = new Services('Matriculas')
    }

    async ObterRegistrosAtivos(where = {}) {
        return database[this.modelName].findAll({ where: { ...where } })
    }

    async ObterTodos(where = {}) {
        return database[this.modelName].scope('todos').findAll({ where: { ...where } })
    }

    async CancelaPessoaEMatriculas(estudanteId) {
        return database.sequelize.transaction(async transacao => {
            await super.Alterar({ ativo: false }, estudanteId, { transaction: transacao })
            await this.matriculas.AlterarRegistros({ status: 'cancelado' }, { estudante_id: estudanteId }, {transaction : transacao})
        } )     
    }
}


module.exports = PessoasServices