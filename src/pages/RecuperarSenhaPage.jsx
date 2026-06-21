import { useState } from 'react'
import { Link } from 'react-router-dom'
import InputField from '../components/InputField'
import Botao from '../components/Botao'
import './AuthPage.css'

function RecuperarSenhaPage() {
  const [email, setEmail] = useState('')
  const [erro, setErro] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [carregando, setCarregando] = useState(false)

  function validar() {
    if (!email.trim()) return 'O e-mail é obrigatório.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Informe um e-mail válido.'
    return ''
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const erroMsg = validar()
    if (erroMsg) { setErro(erroMsg); return }

    setCarregando(true)
    await new Promise((r) => setTimeout(r, 800))
    setCarregando(false)
    setEnviado(true)
  }

  return (
    <div className="auth-page">
      <div className="auth-page__card">
        <div className="auth-page__logo">
          <span className="auth-page__logo-icone">🎓</span>
          <h1 className="auth-page__logo-texto">App Aluno</h1>
        </div>

        <h2 className="auth-page__titulo">Recuperar senha</h2>
        <p className="auth-page__subtitulo">Enviaremos um link para o seu e-mail</p>

        {enviado ? (
          <div className="auth-page__sucesso">
            <p>✅ E-mail enviado! Verifique sua caixa de entrada e siga as instruções.</p>
            <Link to="/login" className="auth-page__link">← Voltar ao login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-page__form" noValidate>
            <InputField
              label="E-mail cadastrado"
              type="email"
              name="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErro('') }}
              placeholder="seu@email.com"
              erro={erro}
              required
            />

            <Botao type="submit" variante="primario" larguraTotal disabled={carregando}>
              {carregando ? 'Enviando...' : 'Enviar link de recuperação'}
            </Botao>
          </form>
        )}

        <p className="auth-page__rodape">
          <Link to="/login" className="auth-page__link">← Voltar ao login</Link>
        </p>
      </div>
    </div>
  )
}

export default RecuperarSenhaPage
