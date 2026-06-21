const BASE_URL = 'https://api.github.com'

export async function buscarUsuarioGithub(username) {
  const res = await fetch(`${BASE_URL}/users/${username}`)
  if (!res.ok) {
    throw new Error(`Usuário "${username}" não encontrado (status ${res.status})`)
  }
  const data = await res.json()
  return data
}

export async function buscarReposGithub(username) {
  const res = await fetch(`${BASE_URL}/users/${username}/repos?per_page=6&sort=updated`)
  if (!res.ok) {
    throw new Error(`Não foi possível buscar repositórios (status ${res.status})`)
  }
  const data = await res.json()
  return data
}
