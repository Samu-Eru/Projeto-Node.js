const { Router } = require('express')
const TurmaController = require('../controllers/TurmaController')

const router = Router()

router.get('/turma', TurmaController.ObterTodasTurmas)
router.get('/turma/:id', TurmaController.ObterTurmaPorId)
router.post('/turma', TurmaController.Cadastrar)
router.put('/turma/:id', TurmaController.Alterar)
router.delete('/turma/:id', TurmaController.Deletar)

module.exports = router 