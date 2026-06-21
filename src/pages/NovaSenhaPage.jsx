import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputField from '../components/InputField'
import Botao from '../components/Botao'
import './AuthPage.css'

function NovaSenhaPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ senha: '', confirmar: '' })
  const [erros, setErros] = useState({})
  const [carregando, setCarregando] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (erros[name]) setErros((prev) => ({ ...prev, [name]: '' }))
  }

  function validar() {
    const novosErros = {}
    if (!form.senha) {
      novosErros.senha = 'A nova senha é obrigatória.'
    } else if (form.senha.length < 6) {
      novosErros.senha = 'A senha deve ter ao menos 6 caracteres.'
    }
    if (!form.confirmar) {
      novosErros.confirmar = 'Confirme a nova senha.'
    } else if (form.senha !== form.confirmar) {
      novosErros.confirmar = 'As senhas não coincidem.'
    }
    return novosErros
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const novosErros = validar()
    if (Object.keys(novosErros).length > 0) { setErros(novosErros); return }

    setCarregando(true)
    await new Promise((r) => setTimeout(r, 800))
    setCarregando(false)
    navigate('/login')
  }

  return (
    <div className="auth-page">
      <div className="auth-page__card">
        <div className="auth-page__logo">
          <span className="auth-page__logo-icone">🎓</span>
          <h1 className="auth-page__logo-texto">App Aluno</h1>
        </div>

        <h2 className="auth-page__titulo">Nova senha</h2>
        <p className="auth-page__subtitulo">Escolha uma senha segura</p>

        <form onSubmit={handleSubmit} className="auth-page__form" noValidate>
          <InputField
            label="Nova senha"
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
            erro={erros.senha}
            required
          />
          <InputField
            label="Confirmar nova senha"
            type="password"
            name="confirmar"
            value={form.confirmar}
            onChange={handleChange}
            placeholder="Repita a senha"
            erro={erros.confirmar}
            required
          />

          <Botao type="submit" variante="primario" larguraTotal disabled={carregando}>
            {carregando ? 'Salvando...' : 'Salvar nova senha'}
          </Botao>
        </form>

        <p className="auth-page__rodape">
          <Link to="/login" className="auth-page__link">← Voltar ao login</Link>
        </p>
      </div>
    </div>
  )
}

export default NovaSenhaPage
