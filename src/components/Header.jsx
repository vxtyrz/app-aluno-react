import { useUsuario } from '../context/UsuarioContext'
import './Header.css'

function Header({ titulo, toggleSidebar }) {
  const { usuario } = useUsuario()

  return (
    <header className="header">
      <div className="header__esquerda">
        <button className="header__menu-btn" onClick={toggleSidebar} aria-label="Abrir menu">
          ☰
        </button>
        <h1 className="header__titulo">{titulo}</h1>
      </div>
      <div className="header__direita">
        <span className="header__saudacao">
          Olá, <strong>{usuario?.nome?.split(' ')[0] || 'Aluno'}</strong>
        </span>
      </div>
    </header>
  )
}

export default Header
