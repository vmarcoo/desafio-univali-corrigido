// A página inicia com a aba de cadastro pré-selecionada, e portanto estilizada
document.querySelector("#opcao-menu-2").classList.remove("opcao-menu-escolhida");
document.querySelector("#opcao-menu-1").classList.add("opcao-menu-escolhida");

// Import de módulos
import { validarInputPreco, addDivisaoMilhar } from "./modulos/validarPreco.js";
import { validarInputQuantidade, adicionaUnidade } from "./modulos/validarQuantidade.js";
import { verificaFabricacao } from "./modulos/verificaFabricacao.js";
import { verificaPerecivel } from "./modulos/verificaPerecivel.js";

// Variáveis de controle e validação dos inputs pela DOM
export const nomeProduto = document.querySelector("#nome")
export const checkboxPerecivel = document.querySelector("#perecivel");
export const dataValidade = document.querySelector("#validade");
export const dataFabricacao = document.querySelector("#fabricacao");
export const inputPreco = document.querySelector("#preco");
export const inputQuantidade = document.querySelector("#quantidade");
export const unidadeMedida = document.querySelector("#unidade-medida");
export const addonUnidade = document.querySelector("#addonUnidade");
const formCadastro = document.querySelector("#cadastroItem");

// Event listener para validação dos inputs
inputPreco.addEventListener("keyup", validarInputPreco);
inputPreco.addEventListener("blur", addDivisaoMilhar);
checkboxPerecivel.addEventListener("click", verificaPerecivel);

unidadeMedida.addEventListener("change", () => {
    adicionaUnidade(unidadeMedida.value);
    inputQuantidade.value = 0;
});

inputQuantidade.addEventListener("blur", () => {
    if (inputQuantidade.value == ""){inputQuantidade.value = 0;}
    if (inputQuantidade.value != 0){validarInputQuantidade(unidadeMedida.value)};
});

inputQuantidade.addEventListener("focus", () => inputQuantidade.value = "");

// Ao selecionar uma data, será verificado o vencimento e adicionado ou não uma classe "vencido"
dataValidade.addEventListener("change", () => {
    if (!verificaFabricacao()){
        dataFabricacao.classList.add("fabricacaoInvalida")
    }

    else {
        dataFabricacao.classList.remove("fabricacaoInvalida")
    }
});

// Ao selecionar uma data, será verificado a perecividade do item e a relação com a data de validade
dataFabricacao.addEventListener("change", () => {
    if (verificaPerecivel() && dataValidade.value != ""){

        if (!verificaFabricacao()){
            dataFabricacao.classList.add("fabricacaoInvalida")
        }

        else {
            dataFabricacao.classList.remove("fabricacaoInvalida")
        }
    }
})

// Devido à biblioteca Flatpickr para datas em PT-BR, é necessária esta função, apesar do required
formCadastro.addEventListener("submit", function(event) {
    if (!formCadastro.classList.contains("submitEdit")){
        if (!dataValidade.value && verificaPerecivel()) {
            alert('Por favor, selecione uma data de validade.');
            event.preventDefault();
          }
    
        else if (!dataFabricacao.value) {
          alert('Por favor, selecione uma data de fabricação.');
          event.preventDefault();
        }
    
        else if (dataFabricacao.classList.contains("fabricacaoInvalida")){
            alert('A data de fabricação não pode exceder a validade.');
            event.preventDefault();
        }
    
        else {
            event.preventDefault();
    
            const dadosFormulario = {
                nomeDoProduto: nomeProduto.value,
                unidadeDeMedida: unidadeMedida.value,
                quantidade: inputQuantidade.value,
                preco: inputPreco.value,
                perecivel: verificaPerecivel(),
                validade: dataValidade.value,
                fabricacao: dataFabricacao.value
            };
    
            // Recupera os dados existentes do localStorage
            let dadosArmazenados = localStorage.getItem('listaDadosFormulario');
    
            // Se não houver dados armazenados, inicia uma nova lista
            if (dadosArmazenados === null) {
                dadosArmazenados = [];
            } 
    
            else {
                // Converte a string JSON de volta para um array
                dadosArmazenados = JSON.parse(dadosArmazenados);
            }
    
            // Adiciona o novo conjunto de dados à lista
            dadosArmazenados.push(dadosFormulario);
    
            // Converte o array de volta para uma string JSON
            const dadosFormularioJSON = JSON.stringify(dadosArmazenados);
    
            // Armazena o JSON no localStorage
            localStorage.setItem('listaDadosFormulario', dadosFormularioJSON);
    
            // Limpa os campos do formulário
            formCadastro.reset();
    
            alert('Dados armazenados com sucesso!');
        }
    }
    else {
        event.preventDefault();
    }
})
