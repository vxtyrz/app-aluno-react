import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUsuario } from '../context/UsuarioContext'
import InputField from '../components/InputField'
import Botao from '../components/Botao'
import './AuthPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useUsuario()

  const [form, setForm] = useState({ email: '', senha: '' })
  const [erros, setErros] = useState({})
  const [carregando, setCarregando] = useState(false)
  const [erroGeral, setErroGeral] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (erros[name]) setErros((prev) => ({ ...prev, [name]: '' }))
  }

  function validar() {
    const novosErros = {}
    if (!form.email.trim()) {
      novosErros.email = 'O e-mail é obrigatório.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      novosErros.email = 'Informe um e-mail válido.'
    }
    if (!form.senha) {
      novosErros.senha = 'A senha é obrigatória.'
    } else if (form.senha.length < 6) {
      novosErros.senha = 'A senha deve ter ao menos 6 caracteres.'
    }
    return novosErros
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErroGeral('')
    const novosErros = validar()
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros)
      return
    }

    setCarregando(true)
    // Simulação de autenticação (substituir por chamada real)
    await new Promise((r) => setTimeout(r, 800))
    setCarregando(false)

    login({ nome: 'Aluno SATC', email: form.email })
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-page__card">
        <div className="auth-page__logo">
          <span className="auth-page__logo-icone">🎓</span>
          <h1 className="auth-page__logo-texto">App Aluno</h1>
        </div>

        <h2 className="auth-page__titulo">Bem-vindo de volta</h2>
        <p className="auth-page__subtitulo">Faça login para continuar</p>

        <form onSubmit={handleSubmit} className="auth-page__form" noValidate>
          {erroGeral && <p className="auth-page__erro-geral">{erroGeral}</p>}

          <InputField
            label="E-mail"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            erro={erros.email}
            required
          />

          <InputField
            label="Senha"
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            placeholder="••••••••"
            erro={erros.senha}
            required
          />

          <div className="auth-page__link-direita">
            <Link to="/recuperar-senha" className="auth-page__link">
              Esqueceu a senha?
            </Link>
          </div>

          <Botao type="submit" variante="primario" larguraTotal disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </Botao>
        </form>

        <p className="auth-page__rodape">
          Não tem uma conta?{' '}
          <Link to="/cadastro" className="auth-page__link">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
