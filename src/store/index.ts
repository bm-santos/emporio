import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducerBebidas from './ducks/bebidas'
import reducerCategorias from './ducks/categorias'

const createRootReducer = () => combineReducers({
    categorias: reducerCategorias,
    bebidas: reducerBebidas
})

const store = createStore(createRootReducer(),composeWithDevTools())

export { store }
