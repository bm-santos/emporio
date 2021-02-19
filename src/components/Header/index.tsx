import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../Styles/style.css"
import { ShoppingCart } from "@material-ui/icons";
import { Badge, IconButton } from "@material-ui/core";

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
                            <a href="/"><li className="home-disabled">Home</li></a>
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
                                <p><strong>
                                    <IconButton >
                                        <Badge badgeContent={<span className="itens-carrinho">{itensNoCarrinho}</span>} >
                                            <ShoppingCart />
                                        </Badge>
                                    </IconButton> {somaCompra.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
                            </>
                        }
                        {
                            itensNoCarrinho === 0 &&
                            <>
                                <p className="carrinho-vazio">
                                    <IconButton>
                                        <Badge badgeContent={<span className="itens-carrinho">{itensNoCarrinho}</span>}>
                                            <ShoppingCart />
                                        </Badge>
                                    </IconButton> Carrinho vazio</p>
                            </>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Header;

