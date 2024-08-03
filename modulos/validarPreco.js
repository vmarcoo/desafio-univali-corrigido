import { inputPreco } from "../script.js";

let valorAtualPreco;
let valorAcumuladoPreco = [];

// Validações do input de preço
export function validarInputPreco(event) {
    const key = event.key;

    // Verifica se o input corresponde à regra da RegEx (apenas números)
    if (!/^[0-9]$/i.test(key) && key != "Backspace" && key != "Tab") {
        valorAtualPreco = Number(valorAcumuladoPreco.map(String).join(""));
        inputPreco.value = String(valorAtualPreco/100).replace(/\./g, ',');
        return;
    }

    // Permite apagar o campo de maneira correta
    if (key == "Backspace"){
        valorAcumuladoPreco.pop();
        valorAtualPreco = Number(valorAcumuladoPreco.map(String).join(""));
        inputPreco.value = String(valorAtualPreco/100).replace(/\./g, ','); 
    }

    // Input obedece aos critérios solicitados
    else {
        valorAcumuladoPreco.push(key);
        valorAtualPreco = Number(valorAcumuladoPreco.map(String).join(""));
        inputPreco.value = String(valorAtualPreco/100).replace(/\./g, ',');
    }
}

// Add os "pontos" que fazem a divisão milhar
export function addDivisaoMilhar(){
    let precoPreFormatado = Number(inputPreco.value.replace(/\,/g, '.')); 

    const formatar = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    inputPreco.value = formatar.format(precoPreFormatado);
}