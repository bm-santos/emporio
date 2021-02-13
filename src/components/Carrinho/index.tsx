import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import Home from "../Home";
import { adicionaNoCarrinho, decrementaItem, incrementaItem, removeDoCarrinho } from "../../store/ducks/carrinho/action";
import { useState } from "react";
import { Redirect } from "react-router-dom";

function Carrinho() {
    const { arrayItens, itensNoCarrinho } = useSelector((state: any) => state.reducerItem)
    const dispatch = useDispatch()
    const [carrinhoVazio, setCarrinhoVazio] = useState<Boolean>(false)


    function saiDoCarrinho(item: any) {
        return (
            dispatch(removeDoCarrinho(item))
        )
    }

    function acrescentaItem(item:any){
        return(
            dispatch(adicionaNoCarrinho(item))
        )
    }

    function funcaoDecrementaItem(item:any){
        return(
            dispatch(decrementaItem(item))
        )
    }
    return (
        <>
            <Header />
            <div>Carrinho</div>
            {
                arrayItens !== undefined && 
                    <div className="Bebidas" >
                        <button onClick={() => saiDoCarrinho(arrayItens[0]?.id)}>Remover do carrinho</button>
                        <img src={arrayItens[0]?.image} alt={arrayItens[0]?.title} />
                        <p>R${arrayItens[0]?.price}</p>
                        <p>Itens: {arrayItens[0]?.title}</p>
                        <button onClick={()=>funcaoDecrementaItem(arrayItens[0])} >-</button>
                        {itensNoCarrinho}
                        <button onClick={()=>acrescentaItem(arrayItens[0])} >+</button>
                    </div>
                
            }
            {/* <div>Carrinho</div>
            {
                arrayItens !== undefined && arrayItens.map((item: any) => (
                    <div className="Bebidas" key={item.id}>
                        <button onClick={() => saiDoCarrinho(item.id)}>Remover do carrinho</button>
                        <img className="img" src={item.image} alt={item.title} />
                        <p>R${item.price}</p>
                        <p>Itens: {item.title}</p>
                        <button onClick={()=>dispatch(decrementaItem(item))} >-</button>
                        {itensNoCarrinho}
                        <button onClick={()=>acrescentaItem(item)} >+</button>
                    </div>
                ))
            } */}
            {
                itensNoCarrinho < 1 && <Redirect to={"/"} exact />
            }
        </>
    )
}

export default Carrinho;