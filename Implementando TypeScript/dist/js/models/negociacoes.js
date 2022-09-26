export class Negociacoes {
    adiciona(negociacao) {
        this.negociacoes.push(negociacao);
    }
    lista() {
        return this.negociacoes;
    }
}
// const negociacoes = new Negociacoes();
// negociacoes.lista();
