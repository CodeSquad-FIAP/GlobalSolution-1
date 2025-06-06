const form = document.getElementById('form-config');
const msg = document.getElementById('mensagem-config');
const inputTempo = document.getElementById('tempo');
const inputLimite = document.getElementById('limiteAbrigo');
const inputTaxa = document.getElementById('taxa');
const STORAGE_KEY = 'configSimulacao';

function preencherCamposComConfiguracoesSalvas() {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (salvo) {
        try {
            const conf = JSON.parse(salvo);
            inputTempo.value = conf.tempo ?? '';
            inputLimite.value = conf.limite ?? '';
            inputTaxa.value = conf.taxa ?? '';
        } catch (e) {
            console.warn('Erro ao carregar configuração salva:', e);
        }
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const tempo = parseInt(inputTempo.value);
    const limite = parseInt(inputLimite.value);
    const taxa = parseInt(inputTaxa.value);

    const config = { tempo, limite, taxa };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));

    exibirMensagem('Configurações salvas com sucesso!', 'sucesso');
});

function exibirMensagem(texto, tipo) {
    msg.textContent = texto;
    msg.className = `mensagem ${tipo}`;
    msg.style.display = 'block';

    setTimeout(() => {
        msg.style.display = 'none';
    }, 4000);
}

window.addEventListener('DOMContentLoaded', preencherCamposComConfiguracoesSalvas);
