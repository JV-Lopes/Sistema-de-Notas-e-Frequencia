import React, { useState } from 'react';

export default function StudentForm({ onAdd }) {
  const initial = { nome: '', notas: [0,0,0,0,0], frequencia: 100 };
  const [form, setForm] = useState(initial);

  function setNota(i, value) {
    const v = Number(value);
    const next = { ...form, notas: [...form.notas] };
    next.notas[i] = isNaN(v) ? 0 : v;
    setForm(next);
  }

  async function submit(e) {
    e.preventDefault();

    // validações
    for (let n of form.notas)
      if (n < 0 || n > 10) return alert('Notas entre 0 e 10');

    if (form.frequencia < 0 || form.frequencia > 100)
      return alert('Frequência 0-100');

    // objeto corrigido para o backend
    const student = {
        nome: form.nome.trim(),
        notas: form.notas.map(n => Number(n)),
        frequencia: Number(form.frequencia)
    };


    await onAdd(student);
    setForm(initial);
  }

  return (
    <form onSubmit={submit} className="card form">
      <div>
        <label>Nome</label>
        <input
          value={form.nome}
          onChange={e => setForm({ ...form, nome: e.target.value })}
          placeholder="Digite o nome"
          required
        />
      </div>

      <div className="notas">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <label>Disciplina {i + 1}</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={form.notas[i]}
              onChange={e => setNota(i, e.target.value)}
              placeholder="0 a 10"
              required
            />
          </div>
        ))}
      </div>

      <div>
        <label>Frequência (%)</label>
        <input
          type="number"
          min="0"
          max="100"
          value={form.frequencia}
          onChange={e => setForm({ ...form, frequencia: e.target.value })}
          placeholder="0 a 100"
          required
        />
      </div>

      <button type="submit">Adicionar Aluno</button>
    </form>
  );
}
