const { Router } = require('express')
const NivelController = require('../controllers/NivelController')

const router = Router()

router.get('/niveis', NivelController.ObterTodosNiveis)
router.get('/niveis/:id', NivelController.ObterNiveisPorID)
router.post('/niveis', NivelController.Cadastrar)
router.put('/niveis/:id', NivelController.Alterar)
router.delete('/niveis/:id', NivelController.Deletar)

module.exports = router 