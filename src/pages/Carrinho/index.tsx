/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { decrementaItem, finalizaCompra, incrementaItem, removeItem } from "../../store/ducks/bebidas/action";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Add, ArrowBack, ArrowForward} from "@material-ui/icons";
import { FaBeer, FaMinus, FaTrash,  } from "react-icons/fa";
import { Button} from "@material-ui/core";
import { BebidaItem, BebidasState } from "../../store/ducks/bebidas/types";

function Carrinho() {
    const { bebidas, qtdCarrinho, compraFinalizada } = useSelector((state: BebidasState) => state)
    const dispatch = useDispatch()

    const [backToHome, setBackToHome] = useState<Boolean>(false)

    function incrementarItem(item: BebidaItem) {return dispatch(incrementaItem(item))}

    function decrementarItem(item: BebidaItem) {return dispatch(decrementaItem(item))}

    function removerItem(item: BebidaItem) {return dispatch(removeItem(item))}

    function finalizarPedido() {return dispatch(finalizaCompra())}

    function voltarParaHome() {return setBackToHome(true)}

    return (
        <>
            {compraFinalizada &&
                <div className="pedido-finalizado">
                    <p>Seu pedido foi realizado com sucesso.<br /><FaBeer /></p>
                    <p onClick={()=><Redirect to={'/cadastro'} />}>Clique aqui para sair</p>
                </div>
            }

            {qtdCarrinho < 1 && !compraFinalizada && <Redirect to={"/"} exact />}

            {backToHome && <Redirect to={"/"} exact />}

            {!compraFinalizada &&
                <>
                    <Header />
                    <div className="carrinho">
                        <div className="container-out" >
                            <div className="carrinho-header-voltar">
                                <span onClick={() => voltarParaHome()}><ArrowBack />Voltar</span>
                            </div>
                            <div className="carrinho-header-meu-carrinho">
                                <p>Meu carrinho</p>
                            </div>{(qtdCarrinho === 0) &&
                                <div className="carrinho-header-meu-carrinho">
                                    <p>Carrinho vazio</p>
                                </div>}
                            <div className="carrinho-header-finalizar">
                                <span onClick={() => finalizarPedido()}>Finalizar<ArrowForward /></span>
                            </div>
                        </div>
                        <div className="container-items" >
                            {!compraFinalizada &&
                                bebidas !== undefined &&
                                bebidas?.map((i: BebidaItem) => (
                                    i.qtd > 0 &&
                                    <>
                                        <div className="carrinho-left-side">
                                            <img src={i?.image} alt={i?.title} />
                                            <p>{i?.price}</p>
                                        </div>
                                        <div className="carrinho-right-side">
                                            <div className="trash-div" >
                                                <span><Button className="trash" startIcon={<FaTrash />}
                                                    onClick={() => removerItem(i)}>Remover item</Button></span>
                                            </div>
                                            <p><strong>{i?.title}</strong></p>
                                            <div className="carrinho-itens">
                                                <div className="carrinho-btn-decrementa" onClick={() => decrementarItem(i)}>
                                                    <span  ><Button ><span  ><FaMinus fontSize="inherit" /></span></Button></span>
                                                </div>
                                                <div className="carrinho-qtd">
                                                    {i.qtd}
                                                </div>
                                                <div className="carrinho-btn-incrementa" onClick={() => incrementarItem(i)}>
                                                    <span  ><Button ><span  ><Add fontSize="inherit" /></span></Button></span>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Carrinho;