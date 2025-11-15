import React, { useEffect, useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import StatsPanel from './components/StatsPanel';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export default function App() {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);

  async function fetchStudents() {
    const res = await fetch(`${API}/students`);
    const data = await res.json();
    setStudents(data);
  }

  async function fetchStats() {
    const res = await fetch(`${API}/students/stats`);
    const data = await res.json();
    setStats(data);
  }

  useEffect(() => {
    fetchStudents();
    fetchStats();
  }, []);

  async function addStudent(student) {
    await fetch(`${API}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });

    await fetchStudents();
    await fetchStats();
  }

  async function deleteStudent(id) {
    if (!confirm("Tem certeza que deseja excluir este aluno?")) return;

    await fetch(`${API}/students/${id}`, {
      method: "DELETE"
    });

    await fetchStudents();
    await fetchStats();
  }

  return (
    <div className="container">
      <h1>Sistema de Notas e Frequência — Dti Digital</h1>

      <StudentForm onAdd={addStudent} />

      <StudentTable
        students={students}
        onDelete={deleteStudent}
      />

      <StatsPanel stats={stats} />
    </div>
  );
}