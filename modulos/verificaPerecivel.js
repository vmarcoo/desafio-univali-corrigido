import { checkboxPerecivel, dataValidade, dataFabricacao } from "../script.js";

// Se o produto for perecível, a data é obrigatória.
export function verificaPerecivel(){
    if(checkboxPerecivel.checked){
        dataValidade.setAttribute("required", true);
        return true;
    }

    else{
        dataValidade.classList.remove("vencido");
        dataValidade.removeAttribute("required");
        return false;
    }
}