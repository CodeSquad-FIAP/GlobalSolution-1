const zonas = [
  { nome: "Vila Luzita", moradores: 35, evacuados: 27 },
  { nome: "Cata Preta", moradores: 20, evacuados: 20 },
  { nome: "Centro (zona crítica)", moradores: 30, evacuados: 30 }
];

const abrigos = [
  { nome: "Ginásio Pedro Dell’Antonia", capacidade: 50, ocupacao: 47 },
  { nome: "Escola João Ramalho", capacidade: 50, ocupacao: 30 }
];

function createCard(title, content, classeExtra = "") {
  const div = document.createElement("div");
  div.className = `card ${classeExtra}`;
  div.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
  return div;
}

function renderDashboard() {
  const container = document.getElementById("cards-container");
  container.innerHTML = "";

  zonas.forEach(z => {
    const perc = Math.round((z.evacuados / z.moradores) * 100);
    let classe = 'critico';
    if (perc >= 75 && perc < 100) classe = "medio";
    if (perc >= 100) classe = "completo";

    const card = createCard(
      `Zona: ${z.nome}`,
      `Evacuados: ${z.evacuados}/${z.moradores} (${perc}%)`,
      classe
    );
    container.appendChild(card);
  });

  abrigos.forEach(a => {
    const perc = Math.round((a.ocupacao / a.capacidade) * 100);
    let classe = "critico";
    if (perc >= 75 && perc < 100) classe = "medio";
    if (perc >= 100) classe = "completo";

    const card = createCard(
      `Abrigo: ${a.nome}`,
      `Ocupação: ${a.ocupacao}/${a.capacidade} (${perc}%)`,
      classe
    );
    container.appendChild(card);
  });

  const totalEvacuados = zonas.reduce((acc, z) => acc + z.evacuados, 0);
  const totalMoradores = zonas.reduce((acc, z) => acc + z.moradores, 0);
  const percFinal = Math.round((totalEvacuados / totalMoradores) * 100);

  const resumo = createCard(
    "Resumo Geral",
    `Evacuados: ${totalEvacuados}/${totalMoradores} (${percFinal}%)`
  );
  container.appendChild(resumo);
}

function exportDados() {
  const dados = {
    zonas,
    abrigos,
    totalEvacuados: zonas.reduce((acc, z) => acc + z.evacuados, 0)
  };

  const json = JSON.stringify(dados, null, 2);
  localStorage.setItem("ultimoRelatorio", json);

  const blob = new Blob([json], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "dados_simulacao.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

renderDashboard();

document.getElementById("exportBtn").addEventListener("click", exportDados);
