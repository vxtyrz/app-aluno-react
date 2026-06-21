import { NavLink, useNavigate } from 'react-router-dom'
import { useUsuario } from '../context/UsuarioContext'
import './Sidebar.css'

const LINKS = [
  { to: '/dashboard', label: 'Dashboard', icone: '🏠' },
  { to: '/disciplinas', label: 'Disciplinas', icone: '📚' },
  { to: '/tutor-ia', label: 'Tutor IA', icone: '🤖' },
  { to: '/perfil', label: 'Perfil', icone: '👤' },
]

function Sidebar({ aberta, fechar }) {
  const { usuario, logout } = useUsuario()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <>
      {aberta && <div className="sidebar__overlay" onClick={fechar} />}

      <aside className={`sidebar ${aberta ? 'sidebar--aberta' : ''}`}>
        <div className="sidebar__topo">
          <div className="sidebar__logo">
            <span className="sidebar__logo-icone">🎓</span>
            <span className="sidebar__logo-texto">App Aluno</span>
          </div>
        </div>

        <div className="sidebar__usuario">
          <div className="sidebar__avatar">{usuario?.nome?.[0]?.toUpperCase() || 'A'}</div>
          <div>
            <p className="sidebar__usuario-nome">{usuario?.nome || 'Aluno'}</p>
            <p className="sidebar__usuario-email">{usuario?.email || ''}</p>
          </div>
        </div>

        <nav className="sidebar__nav">
          {LINKS.map(({ to, label, icone }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? 'sidebar__link--ativo' : ''}`
              }
              onClick={fechar}
            >
              <span className="sidebar__link-icone">{icone}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__rodape">
          <button className="sidebar__sair" onClick={handleLogout}>
            <span>🚪</span>
            <span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
