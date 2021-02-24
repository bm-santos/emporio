import { Button, createMuiTheme, Input, InputAdornment, ThemeProvider } from "@material-ui/core";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { Cake, Lock, Send, AccountCircle, Email } from "@material-ui/icons";
import { yellow, orange } from "@material-ui/core/colors";
import { useDispatch } from "react-redux";
import { buscaCategorias } from "../../store/ducks/categorias/action";
import { buscaBebidas } from "../../store/ducks/bebidas/action";


function Cadastro() {

    const inputNome = useRef<HTMLInputElement>(null)
    const inputEmail = useRef<HTMLInputElement>()
    const inputSenha = useRef<HTMLInputElement>(null)
    const inputIdade = useRef<any>()

    const [logado, setLogado] = useState<Boolean>(false)
    const [menorDeIdade, setMenorDeIdade] = useState<Boolean>(false)
    const [cadastroIncompleto, setCadastroIncompleto] = useState<Boolean>(false)
    const [emailIndisponivel, setEmailIndisponivel] = useState<String>()

    const dispatch = useDispatch()

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: yellow[700]
            },
            secondary: {
                main: orange[900]
            }
        }
    })

    useEffect(() => {
        localStorage.clear()
    }, [])

    const cadastrar = () => {
        console.log(inputNome.current?.value)
        console.log(inputEmail.current?.value)
        console.log(inputSenha.current?.value)
        console.log(inputIdade.current?.value)

        if ((inputNome.current?.value === '') ||
            (inputEmail.current?.value === '') ||
            (inputSenha.current?.value === '') ||
            (inputIdade.current?.value === '')) {
            setCadastroIncompleto(true)

        } else {
            setCadastroIncompleto(false)
            if (inputIdade?.current.value < 18) {
                localStorage.setItem("idade", inputIdade?.current.value)
                setMenorDeIdade(true)
                localStorage.clear()
            } else {
                const requisicao = {
                    name: inputNome.current?.value,
                    email: inputEmail.current?.value,
                    password: inputSenha.current?.value,
                    age: inputIdade.current?.value
                }
                axios.post("http://localhost:4000/register", requisicao)
                    .then(resposta => {
                        localStorage.setItem("token", resposta.data.accessToken)
                        getCategorias()
                    })
                    .catch(function (error) {
                        if (error?.response.status === 400) {
                            setEmailIndisponivel(error.response.data)
                        }
                    })
            }
        }
    }

    const getCategorias = () => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
        return (
            axios.get('http://localhost:4000/categories', { headers: headers })
                .then(resposta => {
                    dispatch(buscaCategorias(resposta.data))
                    getBebidas()
                })
        )
    }

    const getBebidas = () => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
        setLogado(true)
        return (
            axios.get("http://localhost:4000/beers", { headers: headers })
                .then(resposta => {
                    dispatch(buscaBebidas(resposta.data))
                })

                .catch(function (error) {
                    if (error.response.status === 401) {
                        localStorage.clear()
                    }
                })


        )
    }

    return (
        <div className="div-cadastro">
            <div className="img">
                <img src="https://www.cupomvalido.com.br/wp-content/uploads/emporio-da-cerveja-logo-1.png" alt="Empório da cerveja" />
            </div>
            {(!menorDeIdade && localStorage.getItem("idade") === null) &&
                <div className="form-cadastro">
                    <br />
                    <div className="campos-cadastro">
                        <ThemeProvider theme={theme}>
                            <Input color="primary" startAdornment={
                                <InputAdornment className="input-icon" position="start">
                                    <AccountCircle />
                                </InputAdornment>}
                                type="text" inputRef={inputNome} placeholder="Nome" /><br />
                            <Input startAdornment={
                                <InputAdornment className="input-icon" position="start">
                                    <Email />
                                </InputAdornment>} type="email" inputRef={inputEmail} placeholder="E-mail" /><br />
                            <Input startAdornment={
                                <InputAdornment className="input-icon" position="start">
                                    <Lock />
                                </InputAdornment>} type="password" inputRef={inputSenha} placeholder="Senha" /><br />
                            <Input startAdornment={
                                <InputAdornment className="input-icon" position="start">
                                    <Cake />
                                </InputAdornment>} type="number" inputRef={inputIdade} placeholder="Idade" />
                        </ThemeProvider>
                        {cadastroIncompleto && <h3>Todos os campos são obrigatórios.</h3>}
                        {emailIndisponivel !== '' && <h3>{emailIndisponivel}</h3>}
                        <Button className="botao-cadastrar" endIcon={<Send />} onClick={cadastrar}>Cadastrar</Button>
                    </div>
                </div>
            }{
                menorDeIdade &&
                <div className="nao-autorizado">
                    <h1 className="nao-autorizado">Consumo responsável</h1>
                    <p className="nao-autorizado">Desculpe, o conteúdo desse site não está liberado para você.
                    O consumo de bebidas alcoólicas antes dos 18 anos é proibido e
                    pode trazer uma série de riscos e consequências negativas à sua saúde.
                    Nos comprometemos a não anunciar ou comunicar para esse público.</p>
                </div>
            }
            {(localStorage.getItem("token") !== null && logado) && <Redirect to="/" exact />}

        </div >
    )
}

export default Cadastro;