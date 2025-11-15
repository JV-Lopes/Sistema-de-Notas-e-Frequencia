import React from 'react';

export default function StudentTable({ students, onDelete }) {
  return (
    <div>
      <h2>Alunos</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Notas</th>
            <th>Frequência</th>
            <th>Média</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.nome}</td>
              <td>{s.notas.join(', ')}</td>
              <td>{s.frequencia}%</td>
              <td>{s.media}</td>
              <td><button onClick={() => onDelete(s.id)}>Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}