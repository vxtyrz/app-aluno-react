import { useState } from 'react'
import DisciplinaCard from '../components/DisciplinaCard'
import { DISCIPLINAS } from '../services/disciplinasService'
import './DisciplinasPage.css'

const FILTROS = ['Todas', 'Cursando', 'Aprovado', 'Reprovado']

function DisciplinasPage() {
  const [filtro, setFiltro] = useState('Todas')
  const [busca, setBusca] = useState('')

  const disciplinasFiltradas = DISCIPLINAS.filter((d) => {
    const passaFiltro = filtro === 'Todas' || d.situacao === filtro
    const passaBusca =
      d.nome.toLowerCase().includes(busca.toLowerCase()) ||
      d.professor.toLowerCase().includes(busca.toLowerCase())
    return passaFiltro && passaBusca
  })

  return (
    <div className="disciplinas">
      <div className="disciplinas__controles">
        <input
          type="text"
          className="disciplinas__busca"
          placeholder="🔍 Buscar disciplina ou professor..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <div className="disciplinas__filtros">
          {FILTROS.map((f) => (
            <button
              key={f}
              className={`disciplinas__filtro-btn ${filtro === f ? 'disciplinas__filtro-btn--ativo' : ''}`}
              onClick={() => setFiltro(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <p className="disciplinas__contagem">
        {disciplinasFiltradas.length} disciplina{disciplinasFiltradas.length !== 1 ? 's' : ''} encontrada{disciplinasFiltradas.length !== 1 ? 's' : ''}
      </p>

      {disciplinasFiltradas.length === 0 ? (
        <div className="disciplinas__vazio">
          <p>Nenhuma disciplina encontrada com os filtros selecionados.</p>
        </div>
      ) : (
        <div className="disciplinas__grid">
          {disciplinasFiltradas.map((disciplina) => (
            <DisciplinaCard key={disciplina.id} disciplina={disciplina} />
          ))}
        </div>
      )}
    </div>
  )
}

export default DisciplinasPage
