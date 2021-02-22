import { BebidasState, BebidasTypes } from "./types";

const initialState: BebidasState = {
    bebidas: [],
    itensNoCarrinho: 0,
    somaCompra: 0,
}
function reducerBebidas(state = initialState, action: any) {
    let itensCarrinho: any = 0
    let somaTotal: any = 0

    switch (action.type) {
        case BebidasTypes.GET_BEBIDAS:
            return {
                ...state,
                bebidas: action.payload
            }
        case BebidasTypes.ATUALIZA_SUM:
            return {
                ...state,
                somaCompra: action.payload
            }
        case BebidasTypes.ATUALIZA_QTD:
            return {
                ...state,
                itensNoCarrinho: action.payload
            }
        case BebidasTypes.DECREMENTA:
            return {
                ...state,
                bebidas: action.payload
            }
        case BebidasTypes.DELETA_DO_CARRINHO:
            return {
                ...state,
                bebidas: action.payload
            }
        default:
            return state
    }
}

export default reducerBebidas