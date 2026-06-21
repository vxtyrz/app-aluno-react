import { useEffect, useState } from 'react'
import { useUsuario } from '../context/UsuarioContext'
import Card from '../components/Card'
import { buscarAvisos } from '../services/disciplinasService'
import './DashboardPage.css'

const RESUMO = [
  { icone: '📚', titulo: 'Disciplinas', valor: '6', descricao: 'no semestre' },
  { icone: '✅', titulo: 'Aprovado em', valor: '3', descricao: 'disciplinas' },
  { icone: '📖', titulo: 'Cursando', valor: '3', descricao: 'disciplinas' },
  { icone: '🎯', titulo: 'Período', valor: '3º', descricao: 'semestre' },
]

function DashboardPage() {
  const { usuario } = useUsuario()

  const [avisos, setAvisos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregar() {
      setCarregando(true)
      setErro('')
      try {
        const dados = await buscarAvisos()
        setAvisos(dados)
      } catch (err) {
        setErro(err.message || 'Erro ao carregar avisos.')
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [])

  const saudacao = () => {
    const hora = new Date().getHours()
    if (hora < 12) return 'Bom dia'
    if (hora < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  return (
    <div className="dashboard">
      <div className="dashboard__boas-vindas">
        <h2 className="dashboard__saudacao">
          {saudacao()}, <strong>{usuario?.nome?.split(' ')[0] || 'Aluno'}</strong>! 👋
        </h2>
        <p className="dashboard__subtitulo">
          Aqui está um resumo do seu desempenho acadêmico.
        </p>
      </div>

      <div className="dashboard__resumo">
        {RESUMO.map((item) => (
          <Card key={item.titulo} className="dashboard__resumo-card">
            <div className="dashboard__resumo-icone">{item.icone}</div>
            <div className="dashboard__resumo-valor">{item.valor}</div>
            <div className="dashboard__resumo-titulo">{item.titulo}</div>
            <div className="dashboard__resumo-desc">{item.descricao}</div>
          </Card>
        ))}
      </div>

      <section className="dashboard__avisos">
        <h3 className="dashboard__secao-titulo">📢 Avisos recentes</h3>

        {carregando && (
          <div className="dashboard__estado">
            <div className="spinner" />
            <p>Carregando avisos...</p>
          </div>
        )}

        {!carregando && erro && (
          <div className="dashboard__estado dashboard__estado--erro">
            <p>⚠️ {erro}</p>
            <button
              className="dashboard__retry"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!carregando && !erro && (
          <div className="dashboard__avisos-lista">
            {avisos.map((aviso) => (
              <Card key={aviso.id} className="dashboard__aviso-card">
                <p className="dashboard__aviso-titulo">{aviso.title}</p>
                <p className="dashboard__aviso-corpo">{aviso.body}</p>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default DashboardPage
