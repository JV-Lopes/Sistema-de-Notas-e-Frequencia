export function studentAverage(notas){
return +(notas.reduce((s,n)=>s+n,0)/notas.length).toFixed(2);
}


export function classAverages(students){
if (!students.length) return [0,0,0,0,0];
const totals = [0,0,0,0,0];
students.forEach(s => s.notas.forEach((n,i) => totals[i]+=n));
return totals.map(t => +(t/students.length).toFixed(2));
}