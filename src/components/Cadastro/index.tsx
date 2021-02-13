import axios from "axios";
import { useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import Footer from "../Footer";

function Cadastro() {

    const inputNome = useRef<HTMLInputElement>(null)
    const inputEmail = useRef<HTMLInputElement>(null)
    const inputSenha = useRef<HTMLInputElement>(null)
    const inputIdade = useRef<any>()

    const [logado, setLogado] = useState<Boolean>(false)
    const [menorDeIdade, setMenorDeIdade] = useState<Boolean>(false)
    const [cadastroIncompleto, setCadastroIncompleto] = useState<Boolean>(false)
    const [emailIndisponivel, setEmailIndisponivel] = useState<String>()

    const cadastrar = () => {

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
                        if (error.response.status === 400) {
                            setEmailIndisponivel(error.response.data)
                        }
                    })
            }
        }
    }

    return (
        <div>
            {(!menorDeIdade && localStorage.getItem("idade") === null) &&
                <div id="cadastro">
                    <strong>Logo Empório</strong>
                    <p>Bem-vindo(a) à loja oficial das maiores cervejarias do mundo. Antes de continuar, vamos nos conhecer melhor?</p>
                    Nome: <input type="text" ref={inputNome} placeholder="Qual o seu nome completo?" /><br />
                    E-mail: <input type="email" ref={inputEmail} placeholder="Qual o seu melhor e-mail?" /><br />
                    Senha: <input type="password" ref={inputSenha} placeholder="Digite uma senha de acesso" /><br />
                    Idade: <input type="text" ref={inputIdade} placeholder="Quantos anos você tem?" /><br />
                    {cadastroIncompleto && <p>Todos os campos são obrigatórios.</p>}
                    {emailIndisponivel !== '' && <p>{emailIndisponivel}</p>}
                    <button onClick={cadastrar}>Bora cadastrar!</button>
                </div>
            }
            { (localStorage.getItem("token") !== null || logado) && <Redirect to="/" exact />}
            {
                (localStorage.getItem("idade") !== null || menorDeIdade) &&
                <div>
                    <h1>Consumo responsável</h1><br />
                    Desculpe, o conteúdo desse site ainda não está liberado para você.<br />
                    O consumo de bebidas alcoólicas antes dos 18 anos é proibido e
                    pode trazer uma série de riscos e consequências negativas a sua saúde.<br />
                    Nos comprometemos a não anunciar ou comunicar para esse público.<br />
                </div>
            }

        </div >
    )
}

export default Cadastro;