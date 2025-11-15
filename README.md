# Sistema de Notas e Frequência

O sistema permite que um professor gerencie as notas e a frequência de seus alunos de forma simples e eficiente.

---

## 💻 Tecnologias utilizadas

- **Front-end:** React
- **Estilização:** CSS puro
- **Back-end:** Node.js com Express
- **Servidor de API:** REST API simples em memória

---

## ⚙ Funcionalidades

- Inserir notas (0 a 10) para 5 disciplinas de cada aluno
- Registrar a frequência de cada aluno em percentual (0 a 100%)
- Cálculo automático da média de cada aluno
- Cálculo da média da turma por disciplina
- Identificação de alunos com média acima da turma
- Identificação de alunos com frequência abaixo de 75%
- Tooltip mostrando as notas ao passar o mouse sobre a média do aluno
- Exclusão de alunos com confirmação

---

## 📝 Exemplo de entrada e saída

**Entrada:**

João 7 8 6 9 10 80%
Maria 7 8 6 9 10 70%

**Saída:**

João 8.0 80%
Maria 8.0 70%

Médias por disciplina: 7, 8, 6, 9, 10
Alunos com média acima da turma: nenhum
Alunos com frequência abaixo de 75%: Maria


## 🚀 Como executar o projeto

### 1. Back-end

```bash
cd backend
npm install
npm run dev
O servidor ficará disponível em http://localhost:4000/api.

```

2. Front-end
   
```bash
cd frontend
npm install
npm run dev
O front-end estará disponível em http://localhost:5173 (ou a porta exibida pelo Vite).

```

📂 Estrutura do projeto

```
project-dti/
├─ backend/
│  ├─ index.js
│  └─ routes/
│     └─ students.js
├─ frontend/
│  ├─ src/
│  │  ├─ App.jsx
│  │  ├─ main.jsx
│  │  ├─ components/
│  │  │  ├─ StudentForm.jsx
│  │  │  ├─ StudentTable.jsx
│  │  │  └─ StatsPanel.jsx
│  │  └─ styles/
│  │     └─ index.css
├─ README.md
└─ package.json

```

### 📌 Premissas assumidas
O back-end armazena os alunos em memória (não há banco de dados persistente)

Cada aluno deve ter exatamente 5 notas

A frequência deve ser um número entre 0 e 100%

O front-end assume que o back-end está disponível em http://localhost:4000/api por padrão

### 🛠 Decisões de projeto
Uso de React puro no front-end para simplicidade e fácil manutenção

CSS customizado para manter o design limpo sem dependências externas

Tooltips simples com CSS para mostrar as notas dos alunos

Back-end em Express com rotas REST simples, mantendo fácil integração com o front

## ⚠ Observações
Não há persistência real de dados; ao reiniciar o servidor, todos os alunos cadastrados são perdidos.

Testes unitários são opcionais e não foram implementados neste projeto.
