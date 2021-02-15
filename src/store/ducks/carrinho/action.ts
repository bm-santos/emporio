
import { action } from "typesafe-actions";
import { ItensTypes } from "./types";

export const adicionaNoCarrinho = (payload: any) => action(ItensTypes.ADICIONA_NO_CARRINHO, payload)
export const removeDoCarrinho = (payload: any) => action(ItensTypes.DELETA_DO_CARRINHO, payload)
export const incrementaItem = (payload: any) => action(ItensTypes.INCREMENTA_ITEM, payload)
export const decrementaItem = (payload: any) => action(ItensTypes.DECREMENTA_ITEM, payload)
export const finalizaPedido = () => action(ItensTypes.FINALIZA_PEDIDO)
export const limpaCookies = () => action(ItensTypes.LIMPA_COOKIES)