import { Route, Switch } from "react-router-dom";
import Cadastro from "./components/Cadastro";
import Carrinho from "./components/Carrinho";
import Header from "./components/Header";
import Home from "./components/Home";

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