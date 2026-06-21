import { useState } from 'react'
import { useUsuario } from '../context/UsuarioContext'
import Card from '../components/Card'
import InputField from '../components/InputField'
import Botao from '../components/Botao'
import './PerfilPage.css'

function PerfilPage() {
  const { usuario, login } = useUsuario()
  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState({ nome: usuario?.nome || '', email: usuario?.email || '' })
  const [erros, setErros] = useState({})
  const [salvo, setSalvo] = useState(false)

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
    return novosErros
  }

  function handleSalvar(e) {
    e.preventDefault()
    const novosErros = validar()
    if (Object.keys(novosErros).length > 0) { setErros(novosErros); return }
    login({ ...usuario, nome: form.nome, email: form.email })
    setEditando(false)
    setSalvo(true)
    setTimeout(() => setSalvo(false), 3000)
  }

  return (
    <div className="perfil">
      <Card className="perfil__card-principal">
        <div className="perfil__avatar">
          {usuario?.nome?.[0]?.toUpperCase() || 'A'}
        </div>
        <h2 className="perfil__nome">{usuario?.nome || 'Aluno'}</h2>
        <p className="perfil__email">{usuario?.email || '—'}</p>
        {usuario?.matricula && (
          <p className="perfil__matricula">Matrícula: {usuario.matricula}</p>
        )}
        {salvo && <p className="perfil__sucesso">✅ Perfil atualizado com sucesso!</p>}
      </Card>

      <Card className="perfil__card-info">
        <div className="perfil__card-cabecalho">
          <h3 className="perfil__secao-titulo">Dados pessoais</h3>
          {!editando && (
            <Botao variante="secundario" onClick={() => setEditando(true)}>
              ✏️ Editar
            </Botao>
          )}
        </div>

        {editando ? (
          <form onSubmit={handleSalvar} className="perfil__form" noValidate>
            <InputField
              label="Nome completo"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              erro={erros.nome}
              required
            />
            <InputField
              label="E-mail"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              erro={erros.email}
              required
            />
            <div className="perfil__form-acoes">
              <Botao type="submit" variante="primario">Salvar</Botao>
              <Botao variante="secundario" onClick={() => { setEditando(false); setErros({}) }}>
                Cancelar
              </Botao>
            </div>
          </form>
        ) : (
          <dl className="perfil__dados">
            <div className="perfil__dado">
              <dt>Nome</dt>
              <dd>{usuario?.nome || '—'}</dd>
            </div>
            <div className="perfil__dado">
              <dt>E-mail</dt>
              <dd>{usuario?.email || '—'}</dd>
            </div>
            <div className="perfil__dado">
              <dt>Matrícula</dt>
              <dd>{usuario?.matricula || '—'}</dd>
            </div>
            <div className="perfil__dado">
              <dt>Curso</dt>
              <dd>Engenharia de Software</dd>
            </div>
            <div className="perfil__dado">
              <dt>Instituição</dt>
              <dd>Centro Universitário SATC</dd>
            </div>
          </dl>
        )}
      </Card>
    </div>
  )
}

export default PerfilPage
