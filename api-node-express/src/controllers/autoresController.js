import autores from "./models/Autor";

class AutorController {
    static Obterautores = (req, res) => {
        autores.find((err, autores) => {
            res.status(200).json(autores)
        })
    }

    static CadastrarAutor = (req, res) => {
        let autor = new autores(req.body);
        autores.save((err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - Falhas ao cadastrar o autor` })
            }
            else {
                res.status(201).send(autor.toJSON())
            }
        })
    }

    static AlterarAutor = (req, res) => {
        const id = req.params.id;
        autores.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Autor atualizado com sucesso' })
            }
            else {
                res.status(500).send({ message: `Erro ao atualiza o Autor ${err.message}` })
            }
        })
    }

    static ObterAutorPorId = (req, res) => {
        const id = req.params.id;
        autores.findById(id, (err, autores) => {
            if (err) {
                res.status(400).send({ message: `${err.message} Autor não localizado` })
            }
            else {
                res.status(200).send(autores);
            }
        })
    }

    static DeletarAutor = (req, res) => {
        const id = req.params.id;
        autores.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Autor deletado com sucesso!' })
            }
            else {
                res.status(500).send({ message: `${err.message} Autor não encontrado/cadastrado` })
            }
        })
    }
}

export default AutorController