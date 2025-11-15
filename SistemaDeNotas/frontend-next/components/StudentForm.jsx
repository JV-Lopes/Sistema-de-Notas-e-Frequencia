import React, { useState } from 'react';

export default function StudentForm({ onAdd }) {
  const [nome, setNome] = useState('');
  const [notas, setNotas] = useState(['', '', '', '', '']);
  const [frequencia, setFrequencia] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const parsedNotas = notas.map(n => parseFloat(n));
    const parsedFrequencia = parseFloat(frequencia);
    onAdd({ nome, notas: parsedNotas, frequencia: parsedFrequencia });
    setNome('');
    setNotas(['', '', '', '', '']);
    setFrequencia('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Aluno</h2>
      <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" required />
      {notas.map((n, i) => (
        <input
          key={i}
          value={n}
          onChange={e => {
            const newNotas = [...notas];
            newNotas[i] = e.target.value;
            setNotas(newNotas);
          }}
          type="number"
          step="0.1"
          min="0"
          max="10"
          placeholder={`Nota ${i + 1}`}
          required
        />
      ))}
      <input
        value={frequencia}
        onChange={e => setFrequencia(e.target.value)}
        type="number"
        min="0"
        max="100"
        placeholder="Frequência (%)"
        required
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}