export enum BebidasTypes {
    GET_BEBIDAS = 'GET_BEBIDAS',
    GET_QUANTIDADE = 'GET_QUANTIDADE',
    INCREMENTA = 'INCREMENTA',
    DECREMENTA = 'DECREMENTA',
    REMOVE = 'REMOVE',
    FINALIZA = 'FINALIZA'
}

export interface BebidasState {
    bebidas: BebidaItem[],
    qtdCarrinho: number,
    compraFinalizada: boolean
}

export interface BebidaItem {
    id: number,
    title: string,
    price: string,
    description: string,
    image: string,
    qtd: number
}