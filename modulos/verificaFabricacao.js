import { dataValidade, dataFabricacao } from "../script.js";

// Verificar se a data de fabricação é válida (não pode exceder a validade nem o dia de hoje).
export function verificaFabricacao(){
    let hoje = new Date();
    let diaHoje = hoje.getDate();
    let mesHoje = hoje.getMonth()+1;
    let anoHoje = hoje.getFullYear();

    let diaVencimento = Number(dataValidade.value.slice(0,2));
    let mesVencimento = Number(dataValidade.value.slice(3,5));
    let anoVencimento = Number(dataValidade.value.slice(6,10));

    let diaFabricado = Number(dataFabricacao.value.slice(0,2));
    let mesFabricado = Number(dataFabricacao.value.slice(3,5));
    let anoFabricado = Number(dataFabricacao.value.slice(6,10));

    // Return true indica que é uma data válida (apenas compara fabricação com vencimento se o campo de validade estiver preenchido)
    if (dataValidade.value != "" && anoFabricado > anoVencimento) {return false;}
    else if (anoFabricado > anoHoje) {return false;}
    else if (dataValidade.value != "" && anoFabricado == anoVencimento && mesFabricado > mesVencimento){return false;}
    else if (anoFabricado == anoHoje && mesFabricado > mesHoje){return false;}
    else if (dataValidade.value != "" && anoFabricado == anoVencimento && mesFabricado == mesVencimento && diaFabricado > diaVencimento){return false}
    else if (anoFabricado == anoHoje && mesFabricado == mesHoje && diaFabricado > diaHoje){return false}
    else {return true;}
}