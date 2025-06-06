document.getElementById('fileInput').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const dados = JSON.parse(e.target.result);
      renderizarRelatorio(dados);
      exibirMensagem("Relatório importado com sucesso!", "sucesso");
    } catch (err) {
      exibirMensagem("Erro ao ler o arquivo JSON. Verifique o formato.", "erro");
    }
  };
  reader.readAsText(file);
}

function renderizarRelatorio(dados) {
  const container = document.getElementById("relatorio-container");
  container.innerHTML = "";

  const titulo = document.createElement("h3");
  titulo.textContent = "Resumo da simulação carregada";
  container.appendChild(titulo);

  const zonaTitulo = document.createElement("h4");
  zonaTitulo.className = "section-title";
  zonaTitulo.textContent = "Zonas de Risco";
  container.appendChild(zonaTitulo);

  const zonaGrid = document.createElement("div");
  zonaGrid.className = "grid-container";

  dados.zonas.forEach(z => {
    const total = z.moradores;
    const perc = total > 0 ? Math.round((z.evacuados / total) * 100) : 0;
    let classe = "critico";
    if (perc >= 75 && perc < 100) classe = "medio";
    if (perc >= 100) classe = "completo";

    const card = document.createElement("div");
    card.className = `card ${classe}`;
    card.innerHTML = `
      <h4>${z.nome}</h4>
      <p>Evacuados: ${z.evacuados} / ${total}</p>
      <p><strong>${perc}%</strong> da população evacuada</p>
    `;
    zonaGrid.appendChild(card);
  });

  container.appendChild(zonaGrid);

  const abrigoTitulo = document.createElement("h4");
  abrigoTitulo.className = "section-title";
  abrigoTitulo.textContent = "Abrigos";
  container.appendChild(abrigoTitulo);

  const abrigoGrid = document.createElement("div");
  abrigoGrid.className = "grid-container";

  dados.abrigos.forEach(a => {
    const perc = Math.round((a.ocupacao / a.capacidade) * 100);
    let classe = "baixo";
    if (perc >= 50 && perc < 85) classe = "medio";
    if (perc >= 85) classe = "critico";
    if (perc >= 100) classe = "completo";

    const card = document.createElement("div");
    card.className = `card ${classe}`;
    card.innerHTML = `
      <h4>${a.nome}</h4>
      <p>Ocupação: ${a.ocupacao} / ${a.capacidade}</p>
      <p><strong>${perc}%</strong> de ocupação</p>
    `;
    abrigoGrid.appendChild(card);
  });

  container.appendChild(abrigoGrid);

  const total = document.createElement("div");
  total.className = "card destaque";
  total.innerHTML = `
    <h4>Total geral</h4>
    <p><strong>${dados.totalEvacuados}</strong> cidadãos evacuados no total</p>
  `;
  container.appendChild(total);
}

function exibirMensagem(texto, tipo) {
  const msg = document.getElementById("mensagem-status");
  msg.textContent = texto;
  msg.className = `mensagem ${tipo}`;
  msg.style.display = "block";

  setTimeout(() => {
    msg.style.display = "none";
  }, 5000);
}

function carregarConfiguracoes() {
  // futuro: carregar configurações salvas, se necessário
}

function exibirResumoConfiguracoes() {
  // futuro: exibir resumo das configurações usadas
}

window.addEventListener("DOMContentLoaded", () => {
  carregarConfiguracoes();
  exibirResumoConfiguracoes();

  const ultimo = localStorage.getItem("ultimoRelatorio");
  if (ultimo) {
    try {
      const dados = JSON.parse(ultimo);
      renderizarRelatorio(dados);
    } catch (e) {
      console.warn("Erro ao carregar último relatório.");
    }
  }
});

document.getElementById("exportPDFBtn").addEventListener("click", () => {
  window.print();
});

document.getElementById("fileInput").addEventListener("change", function () {
  const nome = this.files[0]?.name || "Nenhum arquivo selecionado";
  document.getElementById("nomeArquivo").textContent = nome;
});