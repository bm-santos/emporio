/* eslint-disable array-callback-return */
import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { adicionaNoCarrinho } from './action'
import { ItensTypes, ItensState, ItensPorProduto } from "./types"

const initialState: ItensState = {
    arrayItens: [],
    itensNoCarrinho: 0,
    somaCompra: 0,
    compraFinalizada: false
}

function reducer(state = initialState, action: any) {
    const itens: any = state.arrayItens
    let itensCarrinho: number = state.itensNoCarrinho
    let somaTotal: number = state.somaCompra

    switch (action.type) {
        case ItensTypes.ADICIONA_NO_CARRINHO:

            itensCarrinho = itensCarrinho + 1
            somaTotal = somaTotal + action.payload.price
            itens?.push(action.payload)
            return {
                ...state,
                arrayItens: itens,
                itensNoCarrinho: itensCarrinho,
                somaCompra: somaTotal
            }
        case ItensTypes.DELETA_DO_CARRINHO:
            return {
                itensNoCarrinho: 0,
                arrayItens: [],
                somaCompra: 0
            }
        case ItensTypes.INCREMENTA_ITEM:
            return {
                itensNoCarrinho: itensCarrinho + 1
            }
        case ItensTypes.DECREMENTA_ITEM:
            somaTotal = somaTotal - action.payload.price
            if (somaTotal < 0) {
                somaTotal = 0
            }
            itensCarrinho = itensCarrinho - 1
            itens.pop()
            return {
                itensNoCarrinho: itensCarrinho,
                somaCompra: somaTotal,
                arrayItens: itens
            }
        case ItensTypes.FINALIZA_PEDIDO:
            return {
                itensNoCarrinho: 0,
                somaCompra: 0,
                arrayItens: [],
                compraFinalizada: true
            }
        case ItensTypes.LIMPA_COOKIES:
            return {
                state: undefined
            }
        default:
            return state
    }
}
const createRootReducer = () => combineReducers({
    reducerItem: reducer
})
const store = createStore(createRootReducer(), composeWithDevTools())

export { reducer };
export { store }