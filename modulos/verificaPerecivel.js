import { checkboxPerecivel, dataValidade, dataFabricacao } from "../script.js";

// Se o produto for perecível, a data é obrigatória. Se não, não.
export function verificaPerecivel(){
    if(checkboxPerecivel.checked){
        dataValidade.setAttribute("required", true);
        dataValidade.removeAttribute("disabled");
        return true;
    }

    else{
        dataValidade.value = "";
        dataValidade.classList.remove("vencido");
        dataValidade.removeAttribute("required");
        dataValidade.setAttribute("disabled", true);
        dataFabricacao.classList.remove("fabricacaoInvalida");
        return false;
    }
}