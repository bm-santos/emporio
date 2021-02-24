import { action } from "typesafe-actions";
import { BebidaItem, BebidasState, BebidasTypes } from "./types";

export const buscaBebidas = (payload: BebidasState) => action(BebidasTypes.GET_BEBIDAS, payload)

export const atualizaQuantidade = (payload: BebidaItem) => action(BebidasTypes.GET_QUANTIDADE, payload)

export const incrementaItem = (payload: BebidaItem) => action(BebidasTypes.INCREMENTA, payload)

export const decrementaItem = (payload: BebidaItem) => action(BebidasTypes.DECREMENTA, payload)

export const removeItem = (payload: BebidaItem) => action(BebidasTypes.REMOVE, payload)

export const finalizaCompra = () => action(BebidasTypes.FINALIZA)