import React, { useEffect, useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import StatsPanel from './components/StatsPanel';

export default function App() {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);

  // Busca lista de alunos
  async function fetchStudents() {
    try {
      const res = await fetch('/api/students');
      if (!res.ok) throw new Error('Erro ao buscar alunos');
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error('Erro ao buscar alunos:', err);
    }
  }

  // Busca estatísticas da turma
  async function fetchStats() {
    try {
      const res = await fetch('/api/students-stats'); // ✅ rota separada
      if (!res.ok) throw new Error('Erro ao buscar estatísticas');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Erro ao buscar estatísticas:', err);
    }
  }

  useEffect(() => {
    fetchStudents();
    fetchStats();
  }, []);

  // Adiciona aluno
  async function addStudent(student) {
    try {
      await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
      });
      await fetchStudents();
      await fetchStats();
    } catch (err) {
      console.error('Erro ao adicionar aluno:', err);
    }
  }

  // Remove aluno
  async function deleteStudent(id) {
    if (!confirm("Tem certeza que deseja excluir este aluno?")) return;
    try {
      await fetch(`/api/students?id=${id}`, { method: "DELETE" });
      await fetchStudents();
      await fetchStats();
    } catch (err) {
      console.error('Erro ao excluir aluno:', err);
    }
  }

  return (
    <div className="container">
      <h1>Sistema de Notas e Frequência</h1>
      <StudentForm onAdd={addStudent} />
      <StudentTable students={students} onDelete={deleteStudent} />
      <StatsPanel stats={stats} />
    </div>
  );
}