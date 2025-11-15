import React from 'react';

export default function StatsPanel({ stats }) {
  if (!stats) return null;

  const { mediasPorDisciplina, mediaGeralTurma, acimaDaMedia, freqAbaixo } = stats;

  return (
    <div>
      <h2>Estatísticas da Turma</h2>
      <p><strong>Média Geral da Turma:</strong> {mediaGeralTurma}</p>

      <div>
        <strong>Média por Disciplina:</strong>
        <ul>
          {mediasPorDisciplina.map((media, i) => (
            <li key={i}>Disciplina {i + 1}: {media}</li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Alunos Acima da Média:</strong>
        {acimaDaMedia.length ? (
          <ul>{acimaDaMedia.map((nome, i) => <li key={i}>{nome}</li>)}</ul>
        ) : <p>Nenhum aluno acima da média</p>}
      </div>

      <div>
        <strong>Frequência Abaixo de 75%:</strong>
        {freqAbaixo.length ? (
          <ul>{freqAbaixo.map((nome, i) => <li key={i}>{nome}</li>)}</ul>
        ) : <p>Todos com frequência adequada</p>}
      </div>
    </div>
  );
}