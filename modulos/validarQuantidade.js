import { addonUnidade, inputQuantidade } from "../script.js";

// Adiciona-se a unidado ao lado do campo quantidade (addon), seja ela lt, kg ou un
export function adicionaUnidade(unidade){
    addonUnidade.textContent = `${unidade}`;
    inputQuantidade.removeAttribute("disabled")
}

// Formatação do campo quantidade, organizando casas decimais
export function validarInputQuantidade(unidade){
    if (unidade == "lt" || unidade == "kg"){
        if(inputQuantidade.value.includes(".")){
            inputQuantidade.value = Number(inputQuantidade.value).toFixed(3);
        }
        
    }

    if (unidade == "un"){
        if(inputQuantidade.value.includes(".")){
            inputQuantidade.value = Number(inputQuantidade.value).toFixed();
        }
    }
}