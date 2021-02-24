import { BebidasState, BebidasTypes } from "./types";

const initialState: BebidasState = {
    bebidas: [{
        id: 0,
        title: '',
        price: '',
        description: '',
        image: '',
        qtd: 0
    }],
    qtdCarrinho: 0,
    compraFinalizada: false
}
function reducerBebidas(state = initialState, action: any) {
    const itens: any = state.bebidas
    let itensCarrinho: any = state.qtdCarrinho
    switch (action.type) {
        case BebidasTypes.GET_BEBIDAS:
            itensCarrinho = 0
            for (let i = 0; i < itens.length; i++) {
                itensCarrinho += itens[i].qtd
            }
            return {
                ...state,
                bebidas: action.payload,
                qtdCarrinho: itensCarrinho
            }
        case BebidasTypes.GET_QUANTIDADE:
            itensCarrinho = 0
            return {
                ...state,
                qtdCarrinho: action.payload
            }
        case BebidasTypes.INCREMENTA:
            itensCarrinho = 0
            for (let i = 0; i < itens.length; i++) {
                if ((itens[i].qtd === null) || (itens[i].qtd === undefined))
                    itens[i].qtd = 0
                if (itens[i].id === action.payload.id) {
                    if (action.payload.qtd >= 0) {
                        itens[i].qtd = itens[i].qtd + 1
                    } else {
                        itens[i].qtd = 1
                    }
                }
                itensCarrinho += itens[i].qtd
            }

            return {
                ...state,
                bebidas: itens,
                qtdCarrinho: itensCarrinho
            }
        case BebidasTypes.DECREMENTA:
            for (let i = 0; i < itens.length; i++) {
                if (itens[i].id === action.payload.id)
                    if (action.payload.qtd >= 0)
                        itens[i].qtd -= 1
            }

            itensCarrinho -= 1

            return {
                ...state,
                bebidas: itens,
                qtdCarrinho: itensCarrinho
            }
        case BebidasTypes.REMOVE:
            itensCarrinho = 0

            for (let i = 0; i < itens.length; i++) {
                itensCarrinho += itens[i].qtd
                if (itens[i].id === action.payload.id) {
                    if (action.payload.qtd >= 0) {
                        itensCarrinho -= itens[i].qtd
                        itens[i].qtd = 0

                    } else {
                        if ((action.payload.qtd === undefined) || (action.payload.qtd === undefined)) {
                            itens[i].qtd = 0
                            itensCarrinho += 1
                        }
                    }
                }
            }

            return {
                ...state,
                bebidas: itens,
                qtdCarrinho: itensCarrinho
            }
        case BebidasTypes.FINALIZA:
            localStorage.clear()
            return {
                compraFinalizada: true
            }
        default:
            return state
    }
}

export default reducerBebidas