import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { ItensState } from "../../store/ducks/carrinho/types";
import Carrinho from "../Carrinho";

function Header() {
    const [categorias, setCategorias] = useState<any>([])
    const myToken = localStorage.getItem("token")

    const { itensNoCarrinho, somaCompra } = useSelector((state: any) => state.reducerItem)

    useEffect(() => {
        const headers = {
            'Authorization': `Bearer ${myToken}`
        }
        axios.get('http://localhost:4000/categories', { headers: headers })
            .then(resposta => setCategorias(resposta.data))
    }, [myToken])
    
    return (
        <>
            <strong>Logo Empório</strong>
            <p>Categorias</p>

            <ul>
                {categorias.map((item: any) => (
                    <li key={item.id}>{item}</li>
                ))

                }
            </ul>

            <div className="Pendente" >
                Itens do carrinho: {itensNoCarrinho} /
                R${somaCompra?.toFixed(2)}
                {
                    itensNoCarrinho === 0 && <p>Carrinho vazio :(</p>
                }
            </div>


        </>
    )
}

export default Header;

