import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { ItensState } from "../../store/ducks/carrinho/types";
import Carrinho from "../Carrinho";
import "../../Styles/style.css"
import { ShoppingCart } from "@material-ui/icons";

function Header() {
    const [categorias, setCategorias] = useState<any>([])
    const myToken = localStorage.getItem("token")

    const { itensNoCarrinho, somaCompra, compraFinalizada } = useSelector((state: any) => state.reducerItem)

    useEffect(() => {
        const headers = {
            'Authorization': `Bearer ${myToken}`
        }
        axios.get('http://localhost:4000/categories', { headers: headers })
            .then(resposta => setCategorias(resposta.data))
    }, [myToken])

    return (
        <div className="header">
            {!compraFinalizada &&
                <div className="container">
                    <div className="item-logo">
                        <img src="https://www.cupomvalido.com.br/wp-content/uploads/emporio-da-cerveja-logo-1.png" alt="Empório da cerveja" />
                    </div>
                    <div className="item-categorias">
                        <ul>
                            {categorias.map((item: any) => (
                                <a href={`https://www.emporiodacerveja.com.br/${item}`} target="_blank" rel="noreferrer">
                                    <li className="Categorias" key={item.id}>{item}</li>
                                </a>
                            ))

                            }
                        </ul>
                    </div>
                    <div className="item-carrinho" >
                        {itensNoCarrinho !== 0 &&
                            <>
                                <p><strong><ShoppingCart /><span>{itensNoCarrinho}</span></strong> / {somaCompra.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </>
                        }
                        {
                            itensNoCarrinho === 0 &&
                            <>
                                <p className="carrinho-vazio"><ShoppingCart /><span>{itensNoCarrinho}</span> Carrinho vazio</p>
                            </>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Header;

