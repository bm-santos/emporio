import { action } from "typesafe-actions";
import { CategoriasState, CategoriasTypes } from "./types";

export const buscaCategorias = (payload: CategoriasState) =>
    action(CategoriasTypes.GET_CATEGORIAS, payload)