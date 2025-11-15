let students = [];
let nextId = 1;

function calcStudentAverage(notas) {
  const sum = notas.reduce((s, v) => s + v, 0);
  return +(sum / notas.length).toFixed(2);
}

function classAverages(students) {
  if (students.length === 0) return [0, 0, 0, 0, 0];
  const totals = [0, 0, 0, 0, 0];
  students.forEach(s => s.notas.forEach((n, i) => totals[i] += n));
  return totals.map(t => +(t / students.length).toFixed(2));
}

export default function handler(req, res) {
  const { method, url, query, body } = req;

  if (method === 'GET' && url.includes('/stats')) {
    const withAvg = students.map(s => ({ ...s, media: calcStudentAverage(s.notas) }));
    const mediasPorDisciplina = classAverages(students);
    const mediaGeralTurma = withAvg.length
      ? +(withAvg.reduce((s, a) => s + a.media, 0) / withAvg.length).toFixed(2)
      : 0;
    const acimaDaMedia = withAvg.filter(s => s.media > mediaGeralTurma).map(s => s.nome);
    const freqAbaixo = students.filter(s => s.frequencia < 75).map(s => s.nome);
    return res.status(200).json({ mediasPorDisciplina, mediaGeralTurma, acimaDaMedia, freqAbaixo });
  }

  if (method === 'GET') {
    const withAvg = students.map(s => ({ ...s, media: calcStudentAverage(s.notas) }));
    return res.status(200).json(withAvg);
  }

  if (method === 'POST') {
    const { nome, notas, frequencia } = body;
    if (!nome || !Array.isArray(notas) || notas.length !== 5 || typeof frequencia !== 'number')
      return res.status(400).json({ error: 'Formato inválido. Envie nome, 5 notas e frequência.' });
    for (let n of notas)
      if (typeof n !== 'number' || n < 0 || n > 10)
        return res.status(400).json({ error: 'Notas devem ser entre 0 e 10.' });
    if (frequencia < 0 || frequencia > 100)
      return res.status(400).json({ error: 'Frequência deve estar entre 0 e 100.' });

    const newStudent = { id: nextId++, nome, notas, frequencia };
    students.push(newStudent);
    return res.status(201).json({ message: `Aluno ${nome} cadastrado com sucesso!`, student: newStudent });
  }

  if (method === 'DELETE') {
    const id = Number(query.id);
    const index = students.findIndex(s => s.id === id);
    if (index === -1)
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    const removed = students.splice(index, 1);
    return res.status(200).json({ message: `Aluno ${removed[0].nome} removido com sucesso!` });
  }

  return res.status(405).json({ error: 'Método não permitido.' });
}