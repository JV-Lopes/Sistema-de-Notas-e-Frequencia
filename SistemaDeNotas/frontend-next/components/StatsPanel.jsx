import styles from '../components/Layout.module.css';

export default function StatsPanel({ stats }) {
  if (!stats) return null;

  const { mediasPorDisciplina, mediaGeralTurma, acimaDaMedia, freqAbaixo } = stats;

  return (
    <div className={styles.statsPanel}>
      {/* Médias por disciplina */}
      {mediasPorDisciplina.map((media, i) => (
        <div key={i} className={styles.statBox}>
          <h3>Disciplina {i + 1}</h3>
          <p>{media}</p>
        </div>
      ))}

      {/* Média geral da turma */}
      <div className={styles.statBox}>
        <h3>Média Geral</h3>
        <p>{mediaGeralTurma}</p>
      </div>

      {/* Alunos acima da média */}
      <div className={styles.statBox}>
        <h3>Acima da Média</h3>
        <ul>
          {acimaDaMedia.length
            ? acimaDaMedia.map((nome, i) => <li key={i}>{nome}</li>)
            : <li>Nenhum</li>}
        </ul>
      </div>

      {/* Frequência abaixo de 75% */}
      <div className={styles.statBox}>
        <h3>Frequência &lt;75%</h3>
        <ul>
          {freqAbaixo.length
            ? freqAbaixo.map((nome, i) => <li key={i}>{nome}</li>)
            : <li>Todos OK</li>}
        </ul>
      </div>
    </div>
  );
}
