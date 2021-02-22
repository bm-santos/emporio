import { ShoppingCart } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { atualizaQtdCarrinho, atualizaValorTotal } from "../../store/ducks/bebidas/action";
import { adicionaNoCarrinho } from "../../store/ducks/carrinho/action";
import Header from "../Header";

function Home() {

    const myToken = localStorage.getItem("token")

    const [carrinhoVazio, setCarrinhoVazio] = useState<Boolean>(true)
    const dispatch = useDispatch()

    const { arrayItens } = useSelector((state: any) => state.carrinho)
    const { bebidas } = useSelector((state: any) => state.bebidas)

    function adicionaAoCarrinho(item: any) {
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

    return (
        <>
            {myToken === null && <Redirect to={'/cadastro'} />}
            <Header />
            <div className="home">
                <div className="container">
                    {bebidas !== undefined && bebidas.map((item: any) => (
                        <div className="item" key={item.id}>
                            <img src={item.image} alt={item.title} />
                            <p>{item.description}</p>
                            <span>{item.title}</span>
                            <p>{item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            <button onClick={() => adicionaAoCarrinho(item)}><ShoppingCart fontSize="inherit" /> Adicionar ao carrinho</button>
                        </div>

                    ))
                    }</div>
                {
                    !carrinhoVazio && <Redirect to={"/carrinho"} exact />
                }
            </div >
        </>

    )
}

export default Home;