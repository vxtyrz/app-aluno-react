import { useState } from 'react'
import Card from '../components/Card'
import InputField from '../components/InputField'
import Botao from '../components/Botao'
import { buscarUsuarioGithub, buscarReposGithub } from '../services/githubService'
import './TutorIAPage.css'

function TutorIAPage() {
  const [username, setUsername] = useState('')
  const [erroInput, setErroInput] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [perfil, setPerfil] = useState(null)
  const [repos, setRepos] = useState([])

  async function handleBuscar(e) {
    e.preventDefault()
    if (!username.trim()) { setErroInput('Informe um usuário do GitHub.'); return }
    setErroInput('')
    setErro('')
    setPerfil(null)
    setRepos([])
    setCarregando(true)

    try {
      const [dadosPerfil, dadosRepos] = await Promise.all([
        buscarUsuarioGithub(username.trim()),
        buscarReposGithub(username.trim()),
      ])
      setPerfil(dadosPerfil)
      setRepos(dadosRepos)
    } catch (err) {
      setErro(err.message || 'Erro ao buscar dados. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="tutor">
      <Card className="tutor__intro">
        <h2 className="tutor__intro-titulo">🤖 Tutor IA — Perfil do Desenvolvedor</h2>
        <p className="tutor__intro-desc">
          Busque um perfil do GitHub para explorar projetos e atividades de qualquer desenvolvedor.
          Use como referência de estudo e inspiração!
        </p>
      </Card>

      <form onSubmit={handleBuscar} className="tutor__form" noValidate>
        <InputField
          label="Usuário do GitHub"
          name="username"
          value={username}
          onChange={(e) => { setUsername(e.target.value); setErroInput('') }}
          placeholder="Ex.: lucasbeskow"
          erro={erroInput}
        />
        <Botao type="submit" variante="primario" disabled={carregando}>
          {carregando ? 'Buscando...' : '🔍 Buscar perfil'}
        </Botao>
      </form>

      {/* Estado: Carregando */}
      {carregando && (
        <div className="tutor__estado">
          <div className="spinner" />
          <p>Buscando dados do GitHub...</p>
        </div>
      )}

      {/* Estado: Erro */}
      {!carregando && erro && (
        <div className="tutor__estado tutor__estado--erro">
          <p>⚠️ {erro}</p>
        </div>
      )}

      {/* Estado: Dados */}
      {!carregando && !erro && perfil && (
        <div className="tutor__resultado">
          <Card className="tutor__perfil-card">
            <img src={perfil.avatar_url} alt={perfil.login} className="tutor__avatar" />
            <div className="tutor__perfil-info">
              <h3 className="tutor__perfil-nome">{perfil.name || perfil.login}</h3>
              <p className="tutor__perfil-username">@{perfil.login}</p>
              {perfil.bio && <p className="tutor__perfil-bio">{perfil.bio}</p>}
              <div className="tutor__perfil-stats">
                <span>⭐ {perfil.public_repos} repos</span>
                <span>👥 {perfil.followers} seguidores</span>
                <span>📍 {perfil.location || 'Não informado'}</span>
              </div>
            </div>
          </Card>

          {repos.length > 0 && (
            <section className="tutor__repos">
              <h3 className="tutor__repos-titulo">Repositórios recentes</h3>
              <div className="tutor__repos-grid">
                {repos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="tutor__repo-card"
                  >
                    <p className="tutor__repo-nome">{repo.name}</p>
                    {repo.description && (
                      <p className="tutor__repo-desc">{repo.description}</p>
                    )}
                    <div className="tutor__repo-meta">
                      {repo.language && <span>💻 {repo.language}</span>}
                      <span>⭐ {repo.stargazers_count}</span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}

export default TutorIAPage
