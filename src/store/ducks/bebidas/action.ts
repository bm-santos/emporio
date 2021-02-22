import { action } from "typesafe-actions";
import { BebidasState, BebidasTypes } from "./types";

export const buscaBebidas = (payload: BebidasState) =>
    action(BebidasTypes.GET_BEBIDAS, payload)
export const atualizaQtdCarrinho = (payload: any) =>
    action(BebidasTypes.ATUALIZA_QTD, payload)
export const atualizaValorTotal = (payload: any) =>
    action(BebidasTypes.ATUALIZA_SUM, payload)
export const decrementaItem = (payload: any) =>
    action(BebidasTypes.DECREMENTA, payload)
export const removeDoCarrinho = (payload: any) => 
    action(BebidasTypes.DELETA_DO_CARRINHO, payload)