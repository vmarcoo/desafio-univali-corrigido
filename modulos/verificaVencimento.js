// Verificação da data de validade do produto
export function verificaVencimento(data){
    let hoje = new Date();
    let diaHoje = hoje.getDate();
    let mesHoje = hoje.getMonth()+1;
    let anoHoje = hoje.getFullYear();
    let diaVencimento = Number(data.slice(0,2));
    let mesVencimento = Number(data.slice(3,5));
    let anoVencimento = Number(data.slice(6,10));

    // Return true indica que ocorreu o vencimento
    if (anoHoje > anoVencimento) {return true;}
    else if (anoHoje == anoVencimento && mesHoje > mesVencimento){return true;}
    else if (anoHoje == anoVencimento && mesHoje == mesVencimento && diaHoje > diaVencimento){return true}
    else {return false;}
}