import React, { useEffect, useState } from 'react';
import StudentForm from '../components/StudentForm';
import StudentTable from '../components/StudentTable';
import StatsPanel from '../components/StatsPanel';
import styles from '../components/Layout.module.css';

export default function Home() {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({
    mediasPorDisciplina: [],
    mediaGeralTurma: 0,
    acimaDaMedia: [],
    freqAbaixo: []
  });

  // Busca alunos da API
  async function fetchStudents() {
    const res = await fetch('/api/students');
    const data = await res.json();
    setStudents(data);
    return data; // retornamos para atualizar stats
  }

  // Atualiza as estatísticas baseado nos alunos
  function atualizarStats(alunos) {
    if (!alunos || alunos.length === 0) {
      setStats({
        mediasPorDisciplina: [],
        mediaGeralTurma: 0,
        acimaDaMedia: [],
        freqAbaixo: []
      });
      return;
    }

    const numDisciplinas = alunos[0].notas.length;

    const mediasPorDisciplina = Array(numDisciplinas).fill(0).map((_, i) => {
      const soma = alunos.reduce((acc, a) => acc + a.notas[i], 0);
      return (soma / alunos.length).toFixed(2);
    });

    const mediaGeralTurma = (
      alunos.reduce((acc, a) => acc + a.notas.reduce((s, n) => s + n, 0)/a.notas.length, 0)
      / alunos.length
    ).toFixed(2);

    const acimaDaMedia = alunos.filter(a => 
      a.notas.reduce((s, n) => s + n, 0)/a.notas.length > mediaGeralTurma
    ).map(a => a.nome);

    const freqAbaixo = alunos.filter(a => a.frequencia < 75)
                             .map(a => a.nome);

    setStats({ mediasPorDisciplina, mediaGeralTurma, acimaDaMedia, freqAbaixo });
  }

  // Inicializa dados
  useEffect(() => {
    async function init() {
      const alunos = await fetchStudents();
      atualizarStats(alunos);
    }
    init();
  }, []);

  // Adiciona aluno
  async function addStudent(student) {
    await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
    const alunos = await fetchStudents();
    atualizarStats(alunos);
  }

  // Deleta aluno
  async function deleteStudent(id) {
    if (!confirm("Tem certeza que deseja excluir este aluno?")) return;
    await fetch(`/api/students?id=${id}`, { method: "DELETE" });
    const alunos = await fetchStudents();
    atualizarStats(alunos);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sistema de Notas e Frequência</h1>
      <StudentForm onAdd={addStudent} />
      <StudentTable students={students} onDelete={deleteStudent} />
      <StatsPanel stats={stats} />
    </div>
  );
}
