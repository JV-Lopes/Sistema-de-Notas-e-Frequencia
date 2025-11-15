let students = []; // Se quiser compartilhar, use armazenamento externo

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
  if (req.method !== 'GET') return res.status(405).json({ error: 'Método não permitido.' });

  const withAvg = students.map(s => ({ ...s, media: calcStudentAverage(s.notas) }));
  const mediasPorDisciplina = classAverages(students);
  const mediaGeralTurma = withAvg.length
    ? +(withAvg.reduce((s, a) => s + a.media, 0) / withAvg.length).toFixed(2)
    : 0;
  const acimaDaMedia = withAvg.filter(s => s.media > mediaGeralTurma).map(s => s.nome);
  const freqAbaixo = students.filter(s => s.frequencia < 75).map(s => s.nome);

  return res.status(200).json({ mediasPorDisciplina, mediaGeralTurma, acimaDaMedia, freqAbaixo });
}