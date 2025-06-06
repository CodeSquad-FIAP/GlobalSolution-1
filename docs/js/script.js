const form = document.getElementById('form-config');
const msg = document.getElementById('mensagem-config');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const tempo = parseInt(document.getElementById('tempo').value);
    const limite = parseInt(document.getElementById('limiteAbrigo').value);
    const taxa = parseInt(document.getElementById('taxa').value);

    const config = { tempo, limite, taxa };
    localStorage.setItem('configSimulacao', JSON.stringify(config));

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

window.addEventListener('DOMContentLoaded', () => {
    const salvo = localStorage.getItem('configSimulacao');
    if (salvo) {
        const config = JSON.parse(salvo);
        document.getElementById('tempo').value = config.tempo || '';
        document.getElementById('limiteAbrigo').value = config.limite || '';
        document.getElementById('taxa').value = config.taxa || '';
    }
});
