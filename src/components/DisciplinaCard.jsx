import './DisciplinaCard.css'

function DisciplinaCard({ disciplina }) {
  const { nome, professor, creditos, periodo, situacao } = disciplina

  const situacaoClasse = {
    Cursando: 'disciplina-card__badge--cursando',
    Aprovado: 'disciplina-card__badge--aprovado',
    Reprovado: 'disciplina-card__badge--reprovado',
  }[situacao] || ''

  return (
    <div className="disciplina-card">
      <div className="disciplina-card__header">
        <h3 className="disciplina-card__nome">{nome}</h3>
        <span className={`disciplina-card__badge ${situacaoClasse}`}>{situacao}</span>
      </div>
      <p className="disciplina-card__professor">{professor}</p>
      <div className="disciplina-card__info">
        <span>{creditos} créditos</span>
        <span>·</span>
        <span>{periodo} período</span>
      </div>
    </div>
  )
}

export default DisciplinaCard
