// Import de módulos
import { verificaVencimento } from "../modulos/verificaVencimento.js";
import { verificaFabricacao } from "../modulos/verificaFabricacao.js";
import { verificaPerecivel } from "../modulos/verificaPerecivel.js";
import { nomeProduto, checkboxPerecivel, dataValidade, dataFabricacao, inputPreco, inputQuantidade, unidadeMedida } from "../script.js";
import { validarInputQuantidade } from "../modulos/validarQuantidade.js";

// A página inicia com a aba de cadastro pré-selecionada, e portanto estilizada
document.querySelector("#opcao-menu-1").classList.remove("opcao-menu-escolhida");
document.querySelector("#opcao-menu-2").classList.add("opcao-menu-escolhida");

let modal = document.querySelector("#myModal");

// Quando o usuário clica fora do modal, fecha o modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//Recuperar o item do localStorage para listagem
const listaDadosFormularioStr = localStorage.getItem("listaDadosFormulario");

//Parsear a string JSON para um objeto JavaScript
const listaDadosFormulario = JSON.parse(listaDadosFormularioStr);

//Transformar o objeto em um array de arrays
const dadosFormulario = listaDadosFormulario.map(item => [
    item.nomeDoProduto,
    `${item.quantidade.replace(/\./g, ',')} ${item.unidadeDeMedida}`, // Concatenar quantidade e unidadeDeMedida
    "R$"+item.preco,
    item.perecivel ? "Sim" : "Não", // Converter true/false para "Sim"/"Não"
    item.validade === "" ? "***" : item.validade, // Se a validade estiver vazia (não perecível), imprimir ***
    item.fabricacao
]);

// Como os dados do LocalStorage foram convertidos em um array de array, cada iteração "i" representa um array
// dentro do array principal, e cada iteração "j" representa os elementos dentro de cada um destes arrays (nome, quantidade, etc)
for (let i = 0; i < dadosFormulario.length; i++){

    const tbody = document.querySelector("tbody");
    const linha = document.createElement("tr");
    
    for (let j = 0; j < dadosFormulario[i].length; j++){
        const cell = document.createElement("td");
        cell.textContent = dadosFormulario[i][j];
        if (j == 4) { //Verificar se venceu
            if (cell.textContent !== "***"){
                if(verificaVencimento(cell.textContent)){
                    cell.classList.add("produto-vencido")
                }
            }
        }
        linha.appendChild(cell)
    }

    // Criação do botão de edição.
    let editar = document.createElement("button");
    editar.classList.add("botao-editar")
    editar.innerHTML = `<span class="material-symbols-outlined">edit</span>`
    editar.addEventListener("click", () => {
        modal.style.display = "block"
        nomeProduto.value = listaDadosFormulario[i].nomeDoProduto;
        unidadeMedida.value = listaDadosFormulario[i].unidadeDeMedida;
        inputQuantidade.value = listaDadosFormulario[i].quantidade;
        inputPreco.value = listaDadosFormulario[i].preco;
        if (listaDadosFormulario[i].perecivel){
            checkboxPerecivel.checked = true;
        }
        dataValidade.value = listaDadosFormulario[i].validade;
        dataFabricacao.value = listaDadosFormulario[i].fabricacao;

        // Validações para atualizar os dados do produto
        let salvarAlteracoes = document.querySelector("#salvarAlteracoes");
        salvarAlteracoes.addEventListener("click", (event) => {
            event.preventDefault();

            let dadosArmazenados = JSON.parse(localStorage.getItem('listaDadosFormulario'));

            if (/^[A-Za-zÀ-ÖØ-ÿÇç\s]*$/.test(nomeProduto.value)){
                dadosArmazenados[i].nomeDoProduto = nomeProduto.value;
            }

            dadosArmazenados[i].unidadeDeMedida = unidadeMedida.value;
            validarInputQuantidade(unidadeMedida.value);
            dadosArmazenados[i].quantidade = inputQuantidade.value;
            dadosArmazenados[i].preco = inputPreco.value;

            if (checkboxPerecivel.checked){
                dadosArmazenados[i].perecivel = true;
            } else {
                dadosArmazenados[i].perecivel = false;
            }

            if (dataValidade.value != listaDadosFormulario[i].validade){
                if (!verificaFabricacao()){
                    dataFabricacao.classList.add("fabricacaoInvalida")
                } else {
                    dataFabricacao.classList.remove("fabricacaoInvalida")
                }
            }

            if (dataFabricacao.value != listaDadosFormulario[i].fabricacao){
                if (!verificaFabricacao()){
                    dataFabricacao.classList.add("fabricacaoInvalida")
                } else {
                    dataFabricacao.classList.remove("fabricacaoInvalida")   
                }
            }

            if (!dataValidade.value && verificaPerecivel()) {
                alert('Por favor, selecione uma data de validade.');
            }
        
            else if (!dataFabricacao.value) {
                alert('Por favor, selecione uma data de fabricação.');
            }
        
            else if (dataFabricacao.classList.contains("fabricacaoInvalida")){
                alert('A data de fabricação não pode exceder a validade nem a data de hoje.');
            }

            else {
                dadosArmazenados[i].validade = dataValidade.value;
                dadosArmazenados[i].fabricacao = dataFabricacao.value;
                const dadosFormularioJSON = JSON.stringify(dadosArmazenados);
                localStorage.setItem('listaDadosFormulario', dadosFormularioJSON);
                window.location.reload();
            }
        })
    })

    linha.appendChild(editar);

    // Criação do botão de exclusão
    let excluir = document.createElement("button");
    excluir.classList.add("botao-excluir")
    excluir.addEventListener("click", () => apagaLinha(i))
    excluir.innerHTML = `<span class="material-symbols-outlined">delete</span>`
    linha.appendChild(excluir);
    tbody.appendChild(linha);

    // Criação do botão de adicionar um novo produto
    let addNovo = document.createElement("button");
    addNovo.classList.add("botao-addNovo")
    addNovo.addEventListener("click", () => {
        window.location.href = "../index.html"
    });
    addNovo.innerHTML = `<span class="material-symbols-outlined">add_circle</span>`
    linha.appendChild(addNovo);
    tbody.appendChild(linha);
}

// Função que exclui um elemento da listagem
function apagaLinha(linha) {
    let confirmacao = confirm("Você tem certeza que deseja excluir este item? Clique em OK para confirmar:")
    if (confirmacao){
        alert("Item removido com sucesso!")
        listaDadosFormulario.splice(linha, 1);
        localStorage.setItem('listaDadosFormulario', JSON.stringify(listaDadosFormulario));
        window.location.reload();
    } else {
        return
    }    
}
