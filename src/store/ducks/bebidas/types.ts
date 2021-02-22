export enum BebidasTypes {
    GET_BEBIDAS = 'GET_BEBIDAS',
    ATUALIZA_QTD = 'ATUALIZA_QTD',
    ATUALIZA_SUM = 'ATUALIZA_SUM',
    DECREMENTA = 'DECREMENTA',
    DELETA_DO_CARRINHO = 'DELETA_DO_CARRINHO'
}

export interface BebidasState {
    bebidas: BebidaItem[],
    itensNoCarrinho: Number,
    somaCompra: Number
}

export interface BebidaItem {
    id: Number,
    title: String,
    price: Number,
    description: String,
    image: String,
    qtd: Number
}