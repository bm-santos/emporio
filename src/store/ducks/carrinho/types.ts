export enum ItensTypes {
    ADICIONA_NO_CARRINHO = 'ADICIONA_NO_CARRINHO',
    DELETA_DO_CARRINHO = 'DELETA_DO_CARRINHO',
    INCREMENTA_ITEM = 'INCREMENTA_ITEM',
    DECREMENTA_ITEM = 'DECREMENTA_ITEM'
}

export interface Item {
    id: number,
    description: string,
    image: string,
    price: number,
    title: string
}

export interface ItensState {
    arrayItens: Item[],
    itensNoCarrinho: Number | any,
    somaCompra: Number | any
}

export interface ItensPorProduto {
    id: number,
    itens: number,
    price: number
}