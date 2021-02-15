import { ShoppingCart } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { adicionaNoCarrinho } from "../../store/ducks/carrinho/action";
import { ItensState } from "../../store/ducks/carrinho/types";
import Header from "../Header";

function Home() {

    const myToken = localStorage.getItem("token")
    const [bebidas, setBebidas] = useState<any>([])
    const [carrinhoVazio, setCarrinhoVazio] = useState<Boolean>(true)
    const dispatch = useDispatch()

    const { arrayItem } = useSelector((state: any) => state.reducerItem)

    useEffect(() => {
        const headers = {
            'Authorization': `Bearer ${myToken}`
        }
        axios.get("http://localhost:4000/beers", { headers: headers })
            .then(resposta => setBebidas(resposta.data))
            .catch(function (error) {
                if (error.response.status === 401) {
                    localStorage.clear()
                }
            })
    }, [myToken])

    function vaiParaCarrinho(item: any) {
        setCarrinhoVazio(false)
        return (
            dispatch(adicionaNoCarrinho(item))
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
                            <button onClick={() => vaiParaCarrinho(item)}><ShoppingCart fontSize="inherit"/> Adicionar ao carrinho</button>
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