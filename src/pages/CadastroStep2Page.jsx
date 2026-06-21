import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUsuario } from '../context/UsuarioContext'
import InputField from '../components/InputField'
import Botao from '../components/Botao'
import './AuthPage.css'

function CadastroStep2Page() {
  const navigate = useNavigate()
  const { login } = useUsuario()

  const [form, setForm] = useState({ matricula: '', senha: '', confirmarSenha: '' })
  const [erros, setErros] = useState({})
  const [carregando, setCarregando] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (erros[name]) setErros((prev) => ({ ...prev, [name]: '' }))
  }

  function validar() {
    const novosErros = {}
    if (!form.matricula.trim()) novosErros.matricula = 'A matrícula é obrigatória.'
    if (!form.senha) {
      novosErros.senha = 'A senha é obrigatória.'
    } else if (form.senha.length < 6) {
      novosErros.senha = 'A senha deve ter ao menos 6 caracteres.'
    }
    if (!form.confirmarSenha) {
      novosErros.confirmarSenha = 'Confirme a senha.'
    } else if (form.senha !== form.confirmarSenha) {
      novosErros.confirmarSenha = 'As senhas não coincidem.'
    }
    return novosErros
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const novosErros = validar()
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros)
      return
    }

    setCarregando(true)
    await new Promise((r) => setTimeout(r, 800))

    const step1 = JSON.parse(sessionStorage.getItem('cadastro_step1') || '{}')
    sessionStorage.removeItem('cadastro_step1')

    login({ nome: step1.nome || 'Aluno', email: step1.email || '', matricula: form.matricula })
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-page__card">
        <div className="auth-page__logo">
          <span className="auth-page__logo-icone">🎓</span>
          <h1 className="auth-page__logo-texto">App Aluno</h1>
        </div>

        <div className="auth-page__steps">
          <div className="auth-page__step auth-page__step--concluido">✓</div>
          <div className="auth-page__step-linha" />
          <div className="auth-page__step auth-page__step--ativo">2</div>
        </div>

        <h2 className="auth-page__titulo">Quase lá!</h2>
        <p className="auth-page__subtitulo">Passo 2 de 2 — Acesso</p>

        <form onSubmit={handleSubmit} className="auth-page__form" noValidate>
          <InputField
            label="Matrícula"
            name="matricula"
            value={form.matricula}
            onChange={handleChange}
            placeholder="Ex.: 2024001234"
            erro={erros.matricula}
            required
          />
          <InputField
            label="Senha"
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
            erro={erros.senha}
            required
          />
          <InputField
            label="Confirmar senha"
            type="password"
            name="confirmarSenha"
            value={form.confirmarSenha}
            onChange={handleChange}
            placeholder="Repita a senha"
            erro={erros.confirmarSenha}
            required
          />

          <Botao type="submit" variante="primario" larguraTotal disabled={carregando}>
            {carregando ? 'Criando conta...' : 'Criar conta'}
          </Botao>
        </form>

        <p className="auth-page__rodape">
          <Link to="/cadastro" className="auth-page__link">
            ← Voltar ao passo 1
          </Link>
        </p>
      </div>
    </div>
  )
}

export default CadastroStep2Page
