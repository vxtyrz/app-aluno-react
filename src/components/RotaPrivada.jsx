import { Navigate, Outlet } from 'react-router-dom'
import { useUsuario } from '../context/UsuarioContext'

function RotaPrivada() {
  const { usuario } = useUsuario()

  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default RotaPrivada
