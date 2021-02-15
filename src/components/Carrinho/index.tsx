import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import Home from "../Home";
import { adicionaNoCarrinho, decrementaItem, finalizaPedido, removeDoCarrinho } from "../../store/ducks/carrinho/action";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import Footer from "../Footer";
import { Add, ArrowForward, PlusOne } from "@material-ui/icons";
import { FaMinus, FaMinusCircle, FaPlusCircle, FaTrash, FaUserMinus } from "react-icons/fa";

function Carrinho() {
    const { arrayItens, itensNoCarrinho } = useSelector((state: any) => state.reducerItem)
    const dispatch = useDispatch()
    const [pedidoFinalizado, setPedidoFinalizado] = useState<Boolean>(false)


    function saiDoCarrinho(item: any) {
        return (
            dispatch(removeDoCarrinho(item))
        )
    }

    function acrescentaItem(item: any) {
        return (
            dispatch(adicionaNoCarrinho(item))
        )
    }

    function funcaoDecrementaItem(item: any) {
        return (
            dispatch(decrementaItem(item))
        )
    }

    function finalizarPedido() {
        setPedidoFinalizado(true)
        localStorage.clear()
        return (
            dispatch(finalizaPedido())
        )

    }

    return (
        <>
            <Header />
            <div className="carrinho">

                {!pedidoFinalizado &&
                    arrayItens !== undefined &&
                    <div className="container" >
                        <div className="carrinho-header-meu-carrinho">
                            <p>Meu carrinho</p>
                        </div>
                        <div className="carrinho-header-finalizar">
                            <span onClick={() => finalizarPedido()}><ArrowForward /></span>
                        </div>
                        <div className="carrinho-left-side">
                            <img src={arrayItens[0]?.image} alt={arrayItens[0]?.title} />
                            <p>{arrayItens[0]?.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                        <div className="carrinho-right-side">
                            <div className="trash">
                                <span onClick={() => saiDoCarrinho(arrayItens[0]?.id)}><FaTrash /></span>
                            </div>
                            <p><strong>{arrayItens[0]?.title}</strong></p>
                            <div className="carrinho-itens">
                                <div className="carrinho-btn-decrementa" onClick={() => funcaoDecrementaItem(arrayItens[0])}>
                                    <span  ><FaMinus fontSize="inherit" /></span>
                                </div>
                                <div className="carrinho-qtd">
                                    {itensNoCarrinho}
                                </div>
                                <div className="carrinho-btn-incrementa" onClick={() => acrescentaItem(arrayItens[0])}>
                                    <span  ><Add fontSize="inherit" /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    pedidoFinalizado &&
                    <div className="pedido-finalizado">
                        <p>Seu pedido foi realizado com sucesso.</p>
                    </div>
                }
            </div>
            {
                itensNoCarrinho < 1 && !pedidoFinalizado && <Redirect to={"/"} exact />
            }

        </>
    )
}

export default Carrinho;