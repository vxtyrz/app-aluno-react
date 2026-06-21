import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import './Layout.css'

const TITULOS = {
  '/dashboard': 'Dashboard',
  '/disciplinas': 'Disciplinas',
  '/tutor-ia': 'Tutor IA',
  '/perfil': 'Perfil',
}

function Layout() {
  const [sidebarAberta, setSidebarAberta] = useState(false)
  const location = useLocation()

  // Fecha sidebar ao trocar de rota no mobile
  useEffect(() => {
    setSidebarAberta(false)
  }, [location.pathname])

  const titulo = TITULOS[location.pathname] || 'App Aluno'

  return (
    <div className="layout">
      <Sidebar aberta={sidebarAberta} fechar={() => setSidebarAberta(false)} />

      <div className="layout__conteudo">
        <Header titulo={titulo} toggleSidebar={() => setSidebarAberta((v) => !v)} />
        <main className="layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
