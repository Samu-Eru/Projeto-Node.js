const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.ObtenMatriculaPorID)
router.get('/pessoas', PessoaController.ObterTodos)
router.get('/pessoas/ativos', PessoaController.ObterTodosAtivos)
router.get('/pessoas/:id', PessoaController.ObterPorID)
router.get('/pessoas/:estudanteId/matriculas', PessoaController.ObterMatriculas)
router.get('/pessoas/matriculas/lotadas', PessoaController.ObterTurmasLotadas)//cuidar com rotas iguas, rotas que esperam exatamente oq está escrito e outras que esperam variáveis 
router.get('/pessoas/matriculas/:turmaId', PessoaController.ObterMatriculasPorTurma)
router.get('/pessoas/:id/restore/', PessoaController.RestaurarRegistro)
router.get('/pessoas/:estudanteId/matricula/:matriculaId/restore', PessoaController.RestaurarRegistroMatricula)
router.post('/pessoas', PessoaController.Cadastrar)
router.post('/pessoas', PessoaController.Cadastrar)
router.post('/pessoas/:id/matricula', PessoaController.CadastrarMatricula)
router.put('/pessoas/:id', PessoaController.Alterar)
router.post('/pessoas/:estudanteId/cancelar', PessoaController.CancelarMatricula)
router.delete('/pessoas/:id', PessoaController.Deletar)
router.delete('/matricula/:id', PessoaController.DeletarMatriculas)

module.exports = router 