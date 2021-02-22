/* eslint-disable array-callback-return */
import { ItensTypes } from "./types"


const initialState: any = {
    arrayItens: [],
    compraFinalizada: false
}

function reducerCarrinho(state = initialState, action: any) {
    const itens: any = state.arrayItens
    switch (action.type) {
        case ItensTypes.ADICIONA_NO_CARRINHO:
            if (action.payload.qtd >= 0) {
                action.payload.qtd = action.payload.qtd + 1
            } else {
                if ((action.payload.qtd === undefined) || (action.payload.qtd === undefined)) {
                    action.payload.qtd = 1
                } else {
                }
            }
            const payload = {
                id: action.payload.id,
                description: action.payload.description,
                image: action.payload.image,
                price: action.payload.price,
                title: action.payload.title,
                qtd: action.payload.qtd
            }

            itens?.push(payload)
            return {
                ...state,
                arrayItens: itens,
            }
        case ItensTypes.DELETA_DO_CARRINHO:

            return {
                arrayItens: []
            }
        
        case ItensTypes.FINALIZA_PEDIDO:
            return {
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
export default reducerCarrinho;
