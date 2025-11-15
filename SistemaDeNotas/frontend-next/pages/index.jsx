import React, { useEffect, useState } from 'react';
import StudentForm from '../components/StudentForm';
import StudentTable from '../components/StudentTable';
import StatsPanel from '../components/StatsPanel';

export default function Home() {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);

  async function fetchStudents() {
    const res = await fetch('/api/students');
    const data = await res.json();
    setStudents(data);
  }

  async function fetchStats() {
    const res = await fetch('/api/students-stats');
    const data = await res.json();
    setStats(data);
  }

  useEffect(() => {
    fetchStudents();
    fetchStats();
  }, []);

  async function addStudent(student) {
    await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
    await fetchStudents();
    await fetchStats();
  }

  async function deleteStudent(id) {
    if (!confirm("Tem certeza que deseja excluir este aluno?")) return;
    await fetch(`/api/students?id=${id}`, { method: "DELETE" });
    await fetchStudents();
    await fetchStats();
  }

  return (
    <div>
      <h1>Sistema de Notas e Frequência</h1>
      <StudentForm onAdd={addStudent} />
      <StudentTable students={students} onDelete={deleteStudent} />
      <StatsPanel stats={stats} />
    </div>
  );
}