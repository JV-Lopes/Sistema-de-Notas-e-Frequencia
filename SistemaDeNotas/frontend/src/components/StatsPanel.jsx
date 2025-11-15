import React from 'react'


export default function StatsPanel({ stats }){
if (!stats) return <div className="card">Carregando estatísticas...</div>
return (
<div className="card stats">
<h2>Estatísticas</h2>
<div>
<strong>Médias por disciplina:</strong>
<div>{stats.mediasPorDisciplina.join(' — ')}</div>
</div>
<div>
<strong>Média geral da turma:</strong> {stats.mediaGeralTurma}
</div>
<div>
<strong>Alunos com média acima da turma:</strong>
<ul>{stats.acimaDaMedia.length ? stats.acimaDaMedia.map(n => <li key={n}>{n}</li>) : <li>nenhum</li>}</ul>
</div>
<div>
<strong>Alunos com frequência abaixo de 75%:</strong>
<ul>{stats.freqAbaixo.length ? stats.freqAbaixo.map(n => <li key={n}>{n}</li>) : <li>nenhum</li>}</ul>
</div>
</div>
)
}