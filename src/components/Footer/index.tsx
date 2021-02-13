import { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { removeDoCarrinho } from "../../store/ducks/carrinho/action";

function Footer() {
    const [cookiesLimpos, setCookiesLimpos] = useState<Boolean>(false)

    const limparCookies = () => {
        setCookiesLimpos(true)
        localStorage.clear()
        
    }
    return (
        <>
            <button onClick={limparCookies}>Limpar cookies</button>
            {
                cookiesLimpos && <Redirect to={"/"} exact />
            }
        </>
    )
}

export default Footer;