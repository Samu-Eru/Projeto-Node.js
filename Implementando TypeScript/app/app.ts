import { NegociacaoController } from "./controllers/negociacao-controller.js";
import { View } from "./views/view.js";

const controller = new NegociacaoController();
const form = document.querySelector('.form');
form.addEventListener('submit', event => {
    event.preventDefault();
    controller.adiciona();
});
