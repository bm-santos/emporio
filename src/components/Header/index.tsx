import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../Styles/style.css"
import { ShoppingCart } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { AppBar, Toolbar, Typography, Badge, IconButton, makeStyles, Button, Drawer, MenuItem, List } from "@material-ui/core";
import { FaItalic } from "react-icons/fa";

function Header() {

    const { itensNoCarrinho, somaCompra, compraFinalizada } = useSelector((state: any) => state.reducerItem)
    const [categorias, setCategorias] = useState<any>([])
    const myToken = localStorage.getItem("token")

    const useStyles = makeStyles(() => ({
        header: {
            alignItems: "right"
        },
        menuButton: {
            fontFamily: "Open Sans, sans-serif",
            fontWeight: 700,
            size: "18px",
            marginLeft: "38px",
            color: "green",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        drawerContainer: {
            padding: "10px 30px"
        }
    }));

    const { header, menuButton, drawerContainer } = useStyles();

    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false
    })
    const { mobileView, drawerOpen } = state;

    useEffect(() => {
        const headers = {
            'Authorization': `Bearer ${myToken}`
        }
        axios.get('http://localhost:4000/categories', { headers: headers })
            .then(resposta => setCategorias(resposta.data))

        const setResponsiveness = () => {
            return window.innerWidth < 690
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({ ...prevState, mobileView: false }));

        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    }, [myToken])

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
                            <IconButton >
                                <Badge badgeContent={<span className="itens-carrinho">{itensNoCarrinho}</span>}>
                                    <ShoppingCart />
                                </Badge>
                            </IconButton></p>
                    </>
                }
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

                    <div className="item-logo">{emporioLogo}</div>
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
        <img src="https://www.cupomvalido.com.br/wp-content/uploads/emporio-da-cerveja-logo-1.png" alt="Empório da cerveja" />
    );
    return (
        <div className="div-header">
            {!compraFinalizada &&
                <AppBar >
                    {mobileView ? displayMobile() : displayDesktop()}
                </AppBar>}
        </div>
    )
}

export default Header;

