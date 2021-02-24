import { ShoppingCart } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { incrementaItem } from "../../store/ducks/bebidas/action";
import Header from "../../components/Header";
import { BebidaItem, BebidasState } from "../../store/ducks/bebidas/types";

function Home() {

    const dispatch = useDispatch()

    const { bebidas } = useSelector((state: BebidasState) => state)

    function incrementarItem(item: BebidaItem) {
        return (
            dispatch(incrementaItem(item))
        )
    }
    console.log(bebidas)

    return (
        <>
            <>
                <Header />
                <div className="home">
                    {bebidas.length > 1 &&
                        < div className="container">
                            {bebidas?.map((item: BebidaItem) => (
                                <div className="item" key={item.id}>
                                    <img src={item.image} alt={item.title} />
                                    <p>{item.description}</p>
                                    <span>{item.title}</span>
                                    <p>{item.price}</p>
                                    <button onClick={() => incrementarItem(item)}>
                                        <ShoppingCart fontSize="inherit" /> Adicionar ao carrinho</button>
                                </div>
                            ))
                            }
                        </div>
                    }

                </div >
            </>
            {localStorage.getItem("token") === null && <Redirect to={'/cadastro'} />}
        </>
        
    )
}

export default Home;