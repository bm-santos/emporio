import { CategoriasState, CategoriasTypes } from "./types";

const initialState: CategoriasState = {
    categorias: []
}

function reducerCategorias(state = initialState, action: any) {
    switch (action.type){
        case CategoriasTypes.GET_CATEGORIAS:
            return{
                ...state,
                categorias: action.payload
            }
            default:
                return state
    }
}
export default reducerCategorias