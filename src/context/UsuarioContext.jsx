import { createContext, useContext, useState } from 'react'

const UsuarioContext = createContext(null)

export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem('usuario')
    return salvo ? JSON.parse(salvo) : null
  })

  function login(dadosUsuario) {
    localStorage.setItem('usuario', JSON.stringify(dadosUsuario))
    setUsuario(dadosUsuario)
  }

  function logout() {
    localStorage.removeItem('usuario')
    setUsuario(null)
  }

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UsuarioContext.Provider>
  )
}

export function useUsuario() {
  const ctx = useContext(UsuarioContext)
  if (!ctx) throw new Error('useUsuario deve ser usado dentro de UsuarioProvider')
  return ctx
}
