// metodo
let calcularIMC = () => {
    let campoAltura = document.getElementById("campo-altura");
    let campoPeso = document.getElementById("campo-peso");

    let peso = parseFloat(campoPeso.value.replace(",", "."));
    let altura = parseFloat(campoAltura.value.replace(",", "."));

    let imc = peso / (altura * altura);
    alert(`IMC: ${imc}`);
}

let apresentarNome = () => {
    let nomeUsuario = document.getElementById("campo-nome").value;
    let sobrenome = document.getElementById("campo-sobrenome").value;

    alert(`Nome do usuario: ${nomeUsuario} ${sobrenome}`);
}