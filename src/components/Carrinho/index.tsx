/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import Home from "../Home";
import { adicionaNoCarrinho, finalizaPedido, decrementaItemCarrinho } from "../../store/ducks/carrinho/action";
import { removeDoCarrinho, atualizaQtdCarrinho, atualizaValorTotal, decrementaItem } from "../../store/ducks/bebidas/action";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Footer from "../Footer";
import { Add, ArrowBack, ArrowForward, LocalBar, PlusOne, SportsMmaTwoTone } from "@material-ui/icons";
import { FaBeer, FaMinus, FaMinusCircle, FaPlusCircle, FaTrash, FaUserMinus } from "react-icons/fa";
import { Button, ButtonGroup } from "@material-ui/core";
import { CarrinhoItem } from "../../store/ducks/carrinho/types";
import { BebidasState } from "../../store/ducks/bebidas/types";
import { action } from "typesafe-actions";

function Carrinho() {
    const { arrayItens, itensNoCarrinho } = useSelector((state: any) => state.carrinho)
    const dispatch = useDispatch()
    const [pedidoFinalizado, setPedidoFinalizado] = useState<Boolean>(false)
    const { bebidas, somaCompra } = useSelector((state: any) => state.bebidas)

    const [backToHome, setBackToHome] = useState<Boolean>(false)

    let qtdCarrinho: any = 0

    for (let i = 0; i < bebidas.length; i++) {
        if (bebidas[i].qtd !== undefined) {
            qtdCarrinho += bebidas[i].qtd
        }
    }

    function removeItem(item: any) {
        for (let i = 0; i < bebidas.length; i++)
            if (bebidas[i].id === item.id)
                if ((bebidas[i].qtd === undefined) || (bebidas[i].qtd === null))
                    bebidas[i].qtd = 0

        return dispatch(removeDoCarrinho(bebidas))
    }

    function acrescentaItem(item: CarrinhoItem) {
        let somaTotal = 0
        let itensCarrinho = 0
        dispatch(adicionaNoCarrinho(item))
        for (let i = 0; i < bebidas.length; i++) {
            if ((bebidas[i].qtd === undefined) || (bebidas[i].qtd === null)) {
                itensCarrinho += 0
            } else {
                itensCarrinho += bebidas[i].qtd
                somaTotal += (bebidas[i].qtd * bebidas[i].price)
            }
        }
        return (
            dispatch(atualizaQtdCarrinho(itensCarrinho)),
            dispatch(atualizaValorTotal(somaTotal))
        )
    }

    function funcaoDecrementaItem(item: any) {
        let somaTotal = somaCompra
        let itensCarrinho = 0
        console.log(item.qtd)
        for (let i = 0; i < bebidas.length; i++) {
            if ((bebidas[i].id === item.id) && (bebidas[i].qtd !== null)) {
                if (bebidas[i].qtd > 0) {
                    bebidas[i].qtd--
                    somaTotal -= bebidas[i].price
                }
            } else {
                bebidas[i].qtd = 0
            }
        }
        for (let i = 0; i < bebidas.length; i++) {
            if ((bebidas[i].qtd === undefined) || (bebidas[i].qtd === null)) {
                itensCarrinho += 0
            } else {
                itensCarrinho += bebidas[i].qtd
            }
        }
        console.log(item.qtd)

        return (
            dispatch(decrementaItem(bebidas)),
            dispatch(atualizaQtdCarrinho(itensCarrinho)),
            dispatch(atualizaValorTotal(somaTotal))
        )
    }

    function finalizarPedido() {
        setPedidoFinalizado(true)
        localStorage.clear()
        return (
            dispatch(finalizaPedido())
        )

    }
    function voltarParaHome() {
        return setBackToHome(true)
    }
    return (
        <>
            <Header />
            <div className="carrinho">
                <div className="container" >
                    <div className="carrinho-header-meu-carrinho">
                        <p>Meu carrinho</p>
                    </div>
                    <div className="carrinho-header-finalizar">
                        <span onClick={() => finalizarPedido()}>Finalizar<ArrowForward /></span>
                    </div>
                    <div className="carrinho-header-finalizar">
                        <span onClick={() => voltarParaHome()}><ArrowBack />Voltar para Home</span>
                    </div>
                    {!pedidoFinalizado &&
                        bebidas !== undefined &&
                        bebidas?.map((i: any) => (
                            i.qtd > 0 &&
                            <>
                                <div className="carrinho-left-side">
                                    <img src={i?.image} alt={i?.title} />
                                    <p>{i?.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                </div>
                                <div className="carrinho-right-side">
                                    <div className="trash-div" >
                                        <span><Button className="trash" startIcon={<FaTrash />}
                                            onClick={() => removeItem(i?.id)}>Remover item</Button></span>
                                    </div>
                                    <p><strong>{i?.title}</strong></p>
                                    <div className="carrinho-itens">
                                        <div className="carrinho-btn-decrementa" onClick={() => funcaoDecrementaItem(i)}>
                                            <span  ><Button ><span  ><FaMinus fontSize="inherit" /></span></Button></span>
                                        </div>
                                        <div className="carrinho-qtd">
                                            {i.qtd}
                                        </div>
                                        <div className="carrinho-btn-incrementa" onClick={() => acrescentaItem(i)}>
                                            <span  ><Button ><span  ><Add fontSize="inherit" /></span></Button></span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    }

                </div>
            </div>


            {/*
                !pedidoFinalizado &&
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
                        <div className="trash-div" >
                            <span><Button className="trash" startIcon={<FaTrash />}
                                onClick={() => saiDoCarrinho(arrayItens[0]?.id)}>Limpar carrinho</Button></span>
                        </div>
                        <p><strong>{arrayItens[0]?.title}</strong></p>
                        <div className="carrinho-itens">
                            <div className="carrinho-btn-decrementa" onClick={() => funcaoDecrementaItem(arrayItens[0])}>
                                <span  ><Button ><span  ><FaMinus fontSize="inherit" /></span></Button></span>
                            </div>
                            <div className="carrinho-qtd">
                                {itensNoCarrinho}
                            </div>
                            <div className="carrinho-btn-incrementa" onClick={() => acrescentaItem(arrayItens[0])}>
                                <span  ><Button ><span  ><Add fontSize="inherit" /></span></Button></span>
                            </div>
                        </div>
                    </div>
                </div>
            */}
            {
                pedidoFinalizado &&
                <div className="pedido-finalizado">
                    <p>Seu pedido foi realizado com sucesso.<br /><FaBeer /></p>
                </div>
            }
            {
                itensNoCarrinho < 1 && !pedidoFinalizado && <Redirect to={"/"} exact />
            }
            {
                backToHome && <Redirect to={"/"} exact />
            }

        </>
    )
}

export default Carrinho;