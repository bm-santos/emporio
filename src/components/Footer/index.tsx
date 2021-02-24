import { useState } from "react";
import { Redirect } from "react-router-dom";

function Footer() {
    const [cookiesLimpos, setCookiesLimpos] = useState<Boolean>(false)

    const limparCookies = () => {
        localStorage.clear()
        return setCookiesLimpos(true)

    }
    return (
        <>
            <button onClick={()=>limparCookies}>Limpar cookies</button>
            {cookiesLimpos && <Redirect to={"/"} exact />}
        </>
    )
}

export default Footer;