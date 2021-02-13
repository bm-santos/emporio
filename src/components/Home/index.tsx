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
        <div>
            {myToken === null && <Redirect to={'/cadastro'} />}
            <Header />
            <p>----------------------</p>
            {bebidas !== undefined && bebidas.map((item: any) => (
                <div className="Bebidas" key={item.id}>
                    <img src={item.image} alt={item.title} />
                    <p>{item.description}</p>
                    <strong>{item.title}</strong>
                    <p>R$ {item.price}</p>
                    <button onClick={() => vaiParaCarrinho(item)}>Adicionar ao carrinho</button>
                </div>
            ))
            }
            {
                !carrinhoVazio && <Redirect to={"/carrinho"} exact />
            }
        </div >

    )
}

export default Home;