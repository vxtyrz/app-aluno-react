# App Aluno — React

Portabilidade do **App Aluno** de HTML/CSS/JS puro para uma SPA em React, desenvolvida como projeto final (N3) da disciplina de Front-end do Centro Universitário SATC.

## 🚀 Tecnologias

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router DOM v6](https://reactrouter.com/)
- Context API (estado global)
- Fetch API (consumo de dados externos)

## 📁 Estrutura de pastas

```
app-aluno-react/
├── public/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Botao.jsx
│   │   ├── Card.jsx
│   │   ├── DisciplinaCard.jsx
│   │   ├── Header.jsx
│   │   ├── InputField.jsx
│   │   ├── Layout.jsx
│   │   ├── RotaPrivada.jsx
│   │   └── Sidebar.jsx
│   ├── context/
│   │   └── UsuarioContext.jsx   # Context API — dados do usuário
│   ├── pages/             # Telas da aplicação
│   │   ├── LoginPage.jsx
│   │   ├── CadastroStep1Page.jsx
│   │   ├── CadastroStep2Page.jsx
│   │   ├── RecuperarSenhaPage.jsx
│   │   ├── NovaSenhaPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── DisciplinasPage.jsx
│   │   ├── PerfilPage.jsx
│   │   └── TutorIAPage.jsx
│   ├── services/          # Chamadas de API
│   │   ├── githubService.js
│   │   └── disciplinasService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## ⚙️ Instalação e execução

### Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior
- npm (incluído com o Node.js)

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/vxtyrz/app-aluno-react.git

# 2. Acesse a pasta do projeto
cd app-aluno-react

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:5173** no navegador.

### Build para produção

```bash
npm run build
npm run preview
```

## 🔐 Fluxo de autenticação

| Rota | Tela |
|------|------|
| `/login` | Login |
| `/cadastro` | Cadastro — passo 1 |
| `/cadastro/dados` | Cadastro — passo 2 |
| `/recuperar-senha` | Recuperar senha |
| `/nova-senha` | Nova senha |

## 🖥️ Telas internas (requerem login)

| Rota | Tela |
|------|------|
| `/dashboard` | Dashboard com avisos via API |
| `/disciplinas` | Lista de disciplinas com filtro |
| `/perfil` | Perfil editável do usuário |
| `/tutor-ia` | Busca de perfil GitHub (API real) |

## 🌐 APIs utilizadas

- **JSONPlaceholder** (`/posts`) — avisos no Dashboard
- **GitHub API** (`/users/{username}`, `/users/{username}/repos`) — TutorIA

## ✅ Requisitos técnicos implementados

- [x] Projeto criado com Vite
- [x] Componentização com props e children
- [x] Hooks: `useState` e `useEffect`
- [x] Formulários controlados (`value` + `onChange`)
- [x] Renderização condicional (`&&` e ternário)
- [x] Renderização de listas (`.map()` com `key`)
- [x] Roteamento com React Router (`BrowserRouter`, `Routes`, `Route`, `NavLink`, `useNavigate`)
- [x] Context API (dados do usuário sem prop drilling)
- [x] Consumo de API com `fetch` e `try/catch/finally` e checagem de `res.ok`
- [x] Validação de formulários com mensagens de erro
- [x] Indicação visual da rota ativa no menu (NavLink)
- [x] Layout responsivo (desktop e mobile)

## 👥 Equipe

- Vitor Almeida

---

Centro Universitário SATC — Engenharia de Software  
Disciplina: Front-end | Professor: Lucas Beskow Vergara
