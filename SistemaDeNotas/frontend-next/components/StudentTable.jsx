import styles from '../components/Layout.module.css';

export default function StudentTable({ students, onDelete }) {
  if (!students || students.length === 0) {
    return <p className={styles.noData}>Nenhum aluno cadastrado.</p>;
  }

  return (
    <div className={styles.studentsContainer}>
      <h2 className={styles.title}>Alunos</h2>

      {/* Tabela Responsiva */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.tableCell}>Nome</th>
              <th className={styles.tableCell}>Notas</th>
              <th className={styles.tableCell}>Frequência</th>
              <th className={styles.tableCell}>Média</th>
              <th className={styles.tableCell}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr
                key={s.id}
                className={i % 2 === 0 ? styles.tableRowEven : ''}
              >
                <td className={styles.tableCell}>{s.nome}</td>
                <td className={styles.tableCell}>{s.notas.join(', ')}</td>
                <td className={styles.tableCell}>{s.frequencia}%</td>
                <td className={styles.tableCell}>{s.media}</td>
                <td className={styles.tableCell}>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => onDelete(s.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
