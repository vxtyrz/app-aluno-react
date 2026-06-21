export const DISCIPLINAS = [
  { id: 1, nome: 'Front-end', professor: 'Lucas Beskow Vergara', creditos: 4, periodo: '3º', situacao: 'Cursando' },
  { id: 2, nome: 'Algoritmos e Programação', professor: 'Prof. Ana Lima', creditos: 4, periodo: '1º', situacao: 'Aprovado' },
  { id: 3, nome: 'Banco de Dados', professor: 'Prof. Carlos Souza', creditos: 4, periodo: '2º', situacao: 'Aprovado' },
  { id: 4, nome: 'Engenharia de Software', professor: 'Prof. Marta Oliveira', creditos: 4, periodo: '3º', situacao: 'Cursando' },
  { id: 5, nome: 'Redes de Computadores', professor: 'Prof. João Pedro', creditos: 3, periodo: '3º', situacao: 'Cursando' },
  { id: 6, nome: 'Sistemas Operacionais', professor: 'Prof. Fernanda Costa', creditos: 3, periodo: '2º', situacao: 'Aprovado' },
]

export async function buscarAvisos() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  if (!res.ok) {
    throw new Error(`Erro ao buscar avisos (status ${res.status})`)
  }
  const data = await res.json()
  return data
}
