import { dataValidade, dataFabricacao } from "../script.js";

// Em caso de produtos perecíveis, é necessário verificar se a data de fabricação é válida.
export function verificaFabricacao(){
    let diaVencimento = Number(dataValidade.value.slice(0,2));
    let mesVencimento = Number(dataValidade.value.slice(3,5));
    let anoVencimento = Number(dataValidade.value.slice(6,10));

    let diaFabricado = Number(dataFabricacao.value.slice(0,2));
    let mesFabricado = Number(dataFabricacao.value.slice(3,5));
    let anoFabricado = Number(dataFabricacao.value.slice(6,10));

    // Return true indica que é uma data válida
    if (anoFabricado > anoVencimento) {return false;}
    else if (anoFabricado == anoVencimento && mesFabricado > mesVencimento){return false;}
    else if (anoFabricado == anoVencimento && mesFabricado == mesVencimento && diaFabricado > diaVencimento){return false}
    else {return true;}
}