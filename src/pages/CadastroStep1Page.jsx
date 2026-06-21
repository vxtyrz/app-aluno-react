import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../components/InputField'
import Botao from '../components/Botao'
import './AuthPage.css'

function CadastroStep1Page() {
  const navigate = useNavigate()

  const [form, setForm] = useState({ nome: '', email: '', cpf: '' })
  const [erros, setErros] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (erros[name]) setErros((prev) => ({ ...prev, [name]: '' }))
  }

  function validar() {
    const novosErros = {}
    if (!form.nome.trim()) novosErros.nome = 'O nome é obrigatório.'
    if (!form.email.trim()) {
      novosErros.email = 'O e-mail é obrigatório.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      novosErros.email = 'Informe um e-mail válido.'
    }
    if (!form.cpf.trim()) {
      novosErros.cpf = 'O CPF é obrigatório.'
    } else if (form.cpf.replace(/\D/g, '').length !== 11) {
      novosErros.cpf = 'Informe um CPF válido (11 dígitos).'
    }
    return novosErros
  }

  function handleSubmit(e) {
    e.preventDefault()
    const novosErros = validar()
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros)
      return
    }
    // Salva dados temporários e avança
    sessionStorage.setItem('cadastro_step1', JSON.stringify(form))
    navigate('/cadastro/dados')
  }

  return (
    <div className="auth-page">
      <div className="auth-page__card">
        <div className="auth-page__logo">
          <span className="auth-page__logo-icone">🎓</span>
          <h1 className="auth-page__logo-texto">App Aluno</h1>
        </div>

        <div className="auth-page__steps">
          <div className="auth-page__step auth-page__step--ativo">1</div>
          <div className="auth-page__step-linha" />
          <div className="auth-page__step">2</div>
        </div>

        <h2 className="auth-page__titulo">Crie sua conta</h2>
        <p className="auth-page__subtitulo">Passo 1 de 2 — Dados pessoais</p>

        <form onSubmit={handleSubmit} className="auth-page__form" noValidate>
          <InputField
            label="Nome completo"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Seu nome completo"
            erro={erros.nome}
            required
          />
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
            label="CPF"
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
            placeholder="000.000.000-00"
            erro={erros.cpf}
            required
          />

          <Botao type="submit" variante="primario" larguraTotal>
            Próximo →
          </Botao>
        </form>

        <p className="auth-page__rodape">
          Já tem uma conta?{' '}
          <Link to="/login" className="auth-page__link">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}

export default CadastroStep1Page
