let students = [];

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