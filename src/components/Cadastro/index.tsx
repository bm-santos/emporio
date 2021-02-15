import { TextField } from "@material-ui/core";
import axios from "axios";
import { SIGILL } from "constants";
import { useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import Footer from "../Footer";
import { FaBeer } from 'react-icons/fa';
import { Cake, Lock, Mail, Person } from "@material-ui/icons";


function Cadastro() {

    const inputNome = useRef<HTMLInputElement>(null)
    const inputEmail = useRef<any>()
    const inputSenha = useRef<HTMLInputElement>(null)
    const inputIdade = useRef<any>()

    const [logado, setLogado] = useState<Boolean>(false)
    const [menorDeIdade, setMenorDeIdade] = useState<Boolean>(false)
    const [cadastroIncompleto, setCadastroIncompleto] = useState<Boolean>(false)
    const [emailIndisponivel, setEmailIndisponivel] = useState<String>()

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
            <img src="https://www.cupomvalido.com.br/wp-content/uploads/emporio-da-cerveja-logo-1.png" alt="Empório da cerveja" />
            {(!menorDeIdade && localStorage.getItem("idade") === null) &&
                <div className="form-cadastro">
                    <h1>Bem-vindo(a) à loja oficial das maiores cervejarias do mundo.</h1>
                    <div className="campos-cadastro">
                        <input type="text" ref={inputNome} placeholder="Nome (obrigatório)" />
                        <input type="email" ref={inputEmail} placeholder="E-mail (obrigatório)" />
                        <input type="password" ref={inputSenha} placeholder="Senha (obrigatório)" /><br />
                        <input type="number" min="0" max="100" ref={inputIdade} placeholder="Idade (obrigatório)" />
                        {cadastroIncompleto && <h3>Todos os campos são obrigatórios.</h3>}
                        {emailIndisponivel !== '' && <h3>{emailIndisponivel}</h3>}
                        <button onClick={cadastrar}>Cadastrar</button>
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
            { (localStorage.getItem("token") !== null || logado) && <Redirect to="/" exact />}

        </div >
    )
}

export default Cadastro;