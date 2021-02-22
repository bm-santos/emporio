export enum ItensTypes {
    ADICIONA_NO_CARRINHO = 'ADICIONA_NO_CARRINHO',
    DELETA_DO_CARRINHO = 'DELETA_DO_CARRINHO',
    INCREMENTA_ITEM = 'INCREMENTA_ITEM',
    DECREMENTA_ITEM = 'DECREMENTA_ITEM',
    FINALIZA_PEDIDO = 'FINALIZA_PEDIDO',
    LIMPA_COOKIES = 'LIMPA_COOKIES'
}

export interface CarrinhoItem {
    id: number,
    description: string,
    image: string,
    price: number,
    title: string,
    qtd: number
}

export interface ItensState {
    arrayItens: CarrinhoItem[],
    arrayCategorias: any[],
    itensNoCarrinho: Number | any,
    somaCompra: Number | any,
    compraFinalizada: Boolean
}

export interface ItensPorProduto {
    id: number,
    itens: number,
    price: number
}