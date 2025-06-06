let config = {
    tempo: 10,
    limite: 100,
    taxa: 60
};

function carregarConfig() {
    const salvo = localStorage.getItem('configSimulacao');
    if (salvo) {
        try {
            config = { ...config, ...JSON.parse(salvo) };
        } catch (e) {
            console.warn('Erro ao carregar config:', e);
        }
    }
}

function exibirConfig() {
    document.getElementById('tempoAtivo').textContent = config.tempo;
    document.getElementById('limiteAtivo').textContent = config.limite;
    document.getElementById('taxaAtiva').textContent = config.taxa;
}

carregarConfig();
exibirConfig();

const zonas = [
    { nome: "Vila Luzita", coords: [-23.6710, -46.5005], moradores: 35, evacuados: 0 },
    { nome: "Cata Preta", coords: [-23.6770, -46.5395], moradores: 20, evacuados: 0 },
    { nome: "Centro (zona crítica)", coords: [-23.6625, -46.5335], moradores: 30, evacuados: 0 }
];

const abrigos = [
    { nome: "Ginásio Pedro Dell’Antonia", coords: [-23.6608, -46.5290], capacidade: 50, ocupacao: 0 },
    { nome: "Escola João Ramalho", coords: [-23.6698, -46.5195], capacidade: 50, ocupacao: 0 }
];

const map = L.map('map').setView([-23.6635, -46.5330], 14);

L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    { attribution: '&copy; OpenStreetMap contributors' }
).addTo(map);

const infoPanel = L.control({ position: 'topright' });
infoPanel.onAdd = () => {
    const div = L.DomUtil.create('div', 'info-panel');
    div.innerHTML = `<strong>Status:</strong><br>Pronto para evacuar`;
    return div;
};
infoPanel.addTo(map);

zonas.forEach(z => {
    L.circle(z.coords, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.4,
        radius: 250
    }).addTo(map).bindPopup(`Zona: ${z.nome}`);
});

const iconAbrigo = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1946/1946436.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
});

abrigos.forEach(a => {
    L.marker(a.coords, { icon: iconAbrigo })
        .addTo(map)
        .bindPopup(`Abrigo: ${a.nome}`)
});

const iconCidadao = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    iconSize: [28, 28],
    iconAnchor: [14, 28]
});

let marcadores = [];
zonas.forEach(z => {
    for (let i = 0; i < z.moradores; i++) {
        const marker = L.marker(z.coords, { icon: iconCidadao })
            .addTo(map)
            .bindPopup(`Cidadão: ${z.nome}`);
        marcadores.push({ marker, origem: z.coords, zona: z });
    }
});

let countEvac = 0;
const totalCivis = marcadores.length;

function dist(p1, p2) {
    const R = 6371000;
    const toRad = d => d * Math.PI / 180;
    const dLat = toRad(p2[0] - p1[0]);
    const dLng = toRad(p2[1] - p1[1]);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(p1[0])) * Math.cos(toRad(p2[0])) *
        Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function encontrarAbrigo(origem) {
    const vagas = abrigos.filter(a =>
        a.ocupacao < Math.floor(a.capacidade * (config.limite / 100))
    );
    if (!vagas.length) return null;
    return vagas.reduce((best, a) =>
        dist(origem, a.coords) < dist(origem, best.coords) ? a : best
    );
}

function animar(marker, origem, destino, onEnd) {
    const STEPS = 20;
    const dLat = (destino[0] - origem[0]) / STEPS;
    const dLng = (destino[1] - origem[1]) / STEPS;
    const intervalo = (config.tempo * 1000) / STEPS;
    let step = 0;
    const timer = setInterval(() => {
        step++;
        marker.setLatLng([
            origem[0] + dLat * step,
            origem[1] + dLng * step
        ]);
        if (step >= STEPS) {
            clearInterval(timer);
            marker.setLatLng(destino);
            onEnd && onEnd();
        }
    }, intervalo);
}

document.getElementById('evacuarBtn').addEventListener('click', () => {
    countEvac = 0;
    abrigos.forEach(a => a.ocupacao = 0);
    zonas.forEach(z => z.evacuados = 0);
    infoPanel.getContainer().innerHTML = `<strong>Status:</strong><br>Iniciando...`;

    marcadores.forEach((c, i) => {
        setTimeout(() => {
            const abr = encontrarAbrigo(c.origem);
            if (!abr) {
                c.marker.bindPopup('Sem abrigo disponível 🚫').openPopup();
            } else {
                abr.ocupacao++;
                animar(c.marker, c.origem, abr.coords, () => {
                    c.marker.bindPopup('✅ Evacuado').openPopup();
                    c.zona.evacuados++;
                    countEvac++;
                    infoPanel.getContainer().innerHTML =
                        `<strong>Status:</strong><br>Evacuados: ${countEvac}/${totalCivis}`;
                });
            }
        }, i * 200);
    });
});

const resetBtn = document.createElement('button');
resetBtn.textContent = 'Resetar simulação';
resetBtn.className = 'btn';
document.querySelector('.grid-container').append(resetBtn);

resetBtn.addEventListener('click', () => {
    marcadores.forEach(c => {
        c.marker.setLatLng(c.origem);
        c.marker.bindPopup(`Cidadão: ${c.zona.nome}`);
    });
    abrigos.forEach(a => a.ocupacao = 0);
    zonas.forEach(z => z.evacuados = 0);
    countEvac = 0;
    infoPanel.getContainer().innerHTML =
        `<strong>Status:</strong><br>Pronto para evacuar`;
});

document.getElementById('exportRelatorioBtn').addEventListener('click', () => {
    const zonasRel = zonas.map(z => ({
        nome: z.nome,
        moradores: z.moradores,
        evacuados: z.evacuados
    }));
    const abrigosRel = abrigos.map(a => ({
        nome: a.nome,
        capacidade: a.capacidade,
        ocupacao: a.ocupacao
    }));
    const rel = {
        zonas: zonasRel,
        abrigos: abrigosRel,
        totalEvacuados: countEvac
    };
    const blob = new Blob([JSON.stringify(rel, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio_simulacao.json';
    a.click();
    URL.revokeObjectURL(url);
});
