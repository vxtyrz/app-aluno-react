import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { UsuarioProvider } from './context/UsuarioContext'

import LoginPage from './pages/LoginPage'
import CadastroStep1Page from './pages/CadastroStep1Page'
import CadastroStep2Page from './pages/CadastroStep2Page'
import RecuperarSenhaPage from './pages/RecuperarSenhaPage'
import NovaSenhaPage from './pages/NovaSenhaPage'

import DashboardPage from './pages/DashboardPage'
import DisciplinasPage from './pages/DisciplinasPage'
import PerfilPage from './pages/PerfilPage'
import TutorIAPage from './pages/TutorIAPage'

import Layout from './components/Layout'
import RotaPrivada from './components/RotaPrivada'

function App() {
  return (
    <UsuarioProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas públicas — autenticação */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroStep1Page />} />
          <Route path="/cadastro/dados" element={<CadastroStep2Page />} />
          <Route path="/recuperar-senha" element={<RecuperarSenhaPage />} />
          <Route path="/nova-senha" element={<NovaSenhaPage />} />

          {/* Rotas privadas — telas internas */}
          <Route element={<RotaPrivada />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/disciplinas" element={<DisciplinasPage />} />
              <Route path="/perfil" element={<PerfilPage />} />
              <Route path="/tutor-ia" element={<TutorIAPage />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </UsuarioProvider>
  )
}

export default App
