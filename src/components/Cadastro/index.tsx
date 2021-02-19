import { Button, CircularProgress, createMuiTheme, IconButton, Input, InputAdornment, InputLabel, LinearProgress, TextField, ThemeProvider } from "@material-ui/core";
import axios from "axios";
import { SIGILL } from "constants";
import { useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import Footer from "../Footer";
import { FaBeer } from 'react-icons/fa';
import { Delete, Cake, Lock, Mail, Person, Send, AccountCircle, Visibility, VisibilityOff, Email } from "@material-ui/icons";
import { yellow, orange } from "@material-ui/core/colors";


function Cadastro() {

    const inputNome = useRef<HTMLInputElement>(null)
    const inputEmail = useRef<any>()
    const inputSenha = useRef<HTMLInputElement>(null)
    const inputIdade = useRef<any>()

    const [logado, setLogado] = useState<Boolean>(false)
    const [menorDeIdade, setMenorDeIdade] = useState<Boolean>(false)
    const [cadastroIncompleto, setCadastroIncompleto] = useState<Boolean>(false)
    const [emailIndisponivel, setEmailIndisponivel] = useState<String>()

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
                        setLogado(true)
                    })
                    .catch(function (error) {
                        if (error?.response.status === 400) {
                            setEmailIndisponivel(error.response.data)
                        }
                    })
            }
        }
    }

    return (
        <div className="div-cadastro">
            <div className="img">
                <img src="https://www.cupomvalido.com.br/wp-content/uploads/emporio-da-cerveja-logo-1.png" alt="Empório da cerveja" />
            </div>
            {(!menorDeIdade && localStorage.getItem("idade") === null) &&
                <div className="form-cadastro">
                    {/*<h2>Bem-vindo(a) à loja oficial das maiores cervejarias do mundo.</h2>*/}<h2></h2>
                    <div className="campos-cadastro">
                        <ThemeProvider theme={theme}>
                            <Input color="primary"  startAdornment={
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
            {(localStorage.getItem("token") !== null || logado) && <Redirect to="/" exact />}

        </div >
    )
}

export default Cadastro;