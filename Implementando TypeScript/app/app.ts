import { NegociacaoController } from "./controllers/negociacao-controller.js";
import { View } from "./views/view.js";

const controller = new NegociacaoController();
const form = document.querySelector('.form');
if(form){
form.addEventListener('submit', event => {
    event.preventDefault();
    controller.adiciona();
});
}else{
    throw Error ('Não foi possível inicializar a aplicação! Verificar se form existe')
}
