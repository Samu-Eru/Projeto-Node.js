import livros from "../models/Livro.js";

class LivroController {
    static ObterLivros = (req, res) => {
        livros.find()
            .populate('autor')
            .exec((err, livros) => {
                res.status(200).json(livros)
            })
    }

    static CadastrarLivro = (req, res) => {
        let liver = new livros(req.body);
        livros.save((err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - Falhas ao cadastrar o livro` })
            }
            else {
                res.status(201).send(livro.toJSON())
            }
        })
    }

    static AlterarLivro = (req, res) => {
        const id = req.params.id;
        livros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Livro atualizado com sucesso' })
            }
            else {
                res.status(500).send({ message: `Erro ao atualiza o livro ${err.message}` })
            }
        })
    }

    static ObterLivroPorId = (req, res) => {
        const id = req.params.id;
        livros.findById(id)
            .populate('autor', 'nome')
            .exec(id, (err, livros) => {
                if (err) {
                    res.status(400).send({ message: `${err.message} livro não localizado` })
                }
                else {
                    res.status(200).send(livros);
                }
            })
    }

    static DeletarLivro = (req, res) => {
        const id = req.params.id;
        livros.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Livro deletado com sucesso!' })
            }
            else {
                res.status(500).send({ message: `${err.message} Livro não encontrado/cadastrado` })
            }
        })
    }

    static ObterPorEditora = (req,res) => {
        const editora = req.query.editora

        livros.find({'editora': editora}, {}, (err, livros) => {
            res.status(200).send(livros);
        })
    }
}

export default LivroController