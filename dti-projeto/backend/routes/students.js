const express = require('express');
const router = express.Router();

// Lista de alunos
let students = [];
let nextId = 1;

// Função para calcular a média de um aluno
function calcStudentAverage(notas) {
  const sum = notas.reduce((s, v) => s + v, 0);
  return +(sum / notas.length).toFixed(2);
}

// Função para calcular média da turma por disciplina
function classAverages(students) {
  if (students.length === 0) return [0, 0, 0, 0, 0];

  const totals = [0, 0, 0, 0, 0];
  students.forEach(s => s.notas.forEach((n, i) => totals[i] += n));

  return totals.map(t => +(t / students.length).toFixed(2));
}

// --- ESTATÍSTICAS GERAIS ---
router.get('/stats', (req, res) => {
  const withAvg = students.map(s => ({ ...s, media: calcStudentAverage(s.notas) }));
  const mediasPorDisciplina = classAverages(students);

  const mediaGeralTurma = withAvg.length
    ? +(withAvg.reduce((s, a) => s + a.media, 0) / withAvg.length).toFixed(2)
    : 0;

  // Quem está acima da média
  const acimaDaMedia = withAvg.filter(s => s.media > mediaGeralTurma).map(s => s.nome);
  
  // Frequência abaixo de 75%
  const freqAbaixo = students.filter(s => s.frequencia < 75).map(s => s.nome);

  res.json({ mediasPorDisciplina, mediaGeralTurma, acimaDaMedia, freqAbaixo });
});

// --- LISTAR ALUNOS ---
router.get('/', (req, res) => {
  const withAvg = students.map(s => ({
    ...s,
    media: calcStudentAverage(s.notas)
  }));
  res.json(withAvg);
});

// --- ADICIONAR ALUNO ---
router.post('/', (req, res) => {
  const { nome, notas, frequencia } = req.body;

  // validação básica
  if (!nome || !Array.isArray(notas) || notas.length !== 5 || typeof frequencia !== 'number')
    return res.status(400).json({ error: 'Ops! Formato inválido. Certifique-se de enviar nome, 5 notas e frequência.' });

  // validação das notas
  for (let n of notas)
    if (typeof n !== 'number' || n < 0 || n > 10)
      return res.status(400).json({ error: 'As notas devem ser números entre 0 e 10.' });

  // validação da frequência
  if (frequencia < 0 || frequencia > 100)
    return res.status(400).json({ error: 'A frequência precisa estar entre 0 e 100%.' });

  const newStudent = { id: nextId++, nome, notas, frequencia };
  students.push(newStudent);

  res.status(201).json({ message: `Aluno ${nome} cadastrado com sucesso!`, student: newStudent });
});

// --- DELETAR ALUNO ---
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) 
    return res.status(404).json({ error: 'Não conseguimos encontrar esse aluno. 😅' });

  const removed = students.splice(index, 1);
  res.json({ message: `Aluno ${removed[0].nome} removido com sucesso!` });
});

module.exports = router;
