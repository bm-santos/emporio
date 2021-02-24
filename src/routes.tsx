import { Route, Switch } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Carrinho from "./pages/Carrinho";
import Home from "./pages/Home";

function Routes(){
    return(
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/cadastro" exact component={Cadastro} />
            <Route path="/carrinho" exact component={Carrinho} />
        </Switch>
    )
}

export default Routes;