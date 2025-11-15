import React from 'react'

export default function StudentTable({ students, onDelete }) {
  if (!students || !students.length)
    return <div className="card">Nenhum aluno cadastrado</div>

  return (
    <div className="card">
      <h2>Alunos</h2>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Notas</th>
            <th>Média</th>
            <th>Frequência</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {students.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.nome}</td>

              {/* lista de notas */}
              <td>{aluno.notas.join(', ')}</td>

              {/* tooltip da média mostrando as notas */}
              <td className="tooltip">
                {aluno.media.toFixed(2)}
                <span className="tooltiptext">
                  Notas: {aluno.notas.join(', ')}
                </span>
              </td>

              {/* frequência */}
              <td>{aluno.frequencia}%</td>

              {/* botão de deletar */}
              <td>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(aluno.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}
