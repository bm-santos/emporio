import { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { limpaCookies } from "../../store/ducks/carrinho/action";

function Footer() {
    const [cookiesLimpos, setCookiesLimpos] = useState<Boolean>(false)
    const dispatch = useDispatch()

    const limparCookies = () => {
        dispatch(limpaCookies())
        localStorage.clear()
        return setCookiesLimpos(true)

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