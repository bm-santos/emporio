import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../Styles/style.css"
import { ShoppingCart } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { AppBar, Toolbar, Badge, IconButton, Drawer, MenuItem, List } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { CategoriasState } from "../../store/ducks/categorias/types";
import { BebidasState } from "../../store/ducks/bebidas/types";

function Header() {

    const { categorias } = useSelector((state: CategoriasState) => state)
    const { qtdCarrinho, compraFinalizada } = useSelector((state: BebidasState) => state)
    const [carrinhoClicado, setCarrinhoClicado] = useState<Boolean>(false)

    const clicouCarrinho = () => {
        setCarrinhoClicado(true)
    }

    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false
    })
    const { mobileView, drawerOpen } = state;

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 690
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({ ...prevState, mobileView: false }));
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    }, [])

    const displayDesktop = () => {
        return (
            <div className="container-header">
                <Toolbar>

                    <div className="item-logo">{emporioLogo}</div>
                    <div className="item-categorias">{getMenuButtons()}</div>
                    <div className="item-carrinho" >{getCartItems()}</div>
                </Toolbar>
            </div>
        );
    };

    const getMenuButtons = () => {
        return categorias.map((catName: any) => {
            return (
                <a
                    href={`https://www.emporiodacerveja.com.br/${catName}`}
                    target="_blank"
                    rel="noreferrer">
                    {catName}
                </a>
            )
        })
    }
    const getCartItems = () => {
        return (
            <div>
                <p className="carrinho-vazio" onClick={clicouCarrinho}>
                    <IconButton >
                        <Badge badgeContent={<span className="itens-carrinho">{qtdCarrinho}</span>}>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </p>
            </div>
        )
    }

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: false }));
        return (
            <div className="container-header">
                <Toolbar>
                    <IconButton
                        {...{
                            edge: "start",
                            color: "inherit",
                            "aria-label": "menu",
                            "aria-haspopup": "true",
                            onClick: handleDrawerOpen,
                        }}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        {...{
                            anchor: "left",
                            open: drawerOpen,
                            onClose: handleDrawerClose,
                        }}>
                        <div className="item-categorias-drawer">{getDrawerChoices()}</div>
                    </Drawer>

                    <div className="item-logo" >{emporioLogo}</div>
                    <div className="item-carrinho" >{getCartItems()}</div>

                </Toolbar >
            </div>
        )
    }

    const getDrawerChoices = () => {
        return categorias.map((category: any) => {
            return ( 
                <List
                    {...{
                        style: { textDecoration: "none" },
                    }}> <a
                        href={`https://www.emporiodacerveja.com.br/${category}`}
                        target="_blank"
                        rel="noreferrer">
                        <MenuItem className="item-categorias-drawer">{category}</MenuItem>
                    </a>
                </List >
            )
        })
    }

    const emporioLogo = (
        <img src={process.env.PUBLIC_URL + 'logo.png'}
            alt="Empório da cerveja" onClick={() => (<Redirect to={"/"} exact />)} />
    );

    return (
        <div className="div-header">
            {!compraFinalizada &&
                <AppBar >
                    {mobileView ? displayMobile() : displayDesktop()}
                </AppBar>
            }
            {carrinhoClicado && <Redirect to={"/carrinho"} exact />}
        </div>
    )
}

export default Header;