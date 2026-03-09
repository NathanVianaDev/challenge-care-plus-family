// Função para carregar dados do usuário logado
function carregarPerfil() {
    const usuarioLogado = {
        nome: "Pacheco",
        foto: "./assets/Images/avatar-padrao.png" 
    };

    document.getElementById('display-name').innerText = usuarioLogado.nome;
    document.getElementById('user-photo').src = usuarioLogado.foto;
}

// Executa ao carregar a página
window.onload = carregarPerfil;

// Adicione isso ao seu script.js
function simularMonitoramento() {
    // Simula batimentos variando entre 75 e 85
    const bpm = Math.floor(Math.random() * (85 - 75 + 1)) + 75;
    const elementoBpm = document.getElementById('valor-bpm');
    if(elementoBpm) elementoBpm.innerText = bpm;
    
}

function atualizarDonutPassos(passosDados) {
    const meta = 10000;
    const circunferencia = 251; 
    
    const porcentagem = Math.min(passosDados / meta, 1);
    const offset = circunferencia - (porcentagem * circunferencia);
    
    const barra = document.getElementById('progresso-passos');
    const texto = document.getElementById('valor-passos-texto');
    
    barra.style.strokeDashoffset = offset;
    
    // Formata para "4.5k" se for maior que 1000, ou o número real
    texto.innerText = passosDados >= 1000 ? (passosDados/1000).toFixed(1) + 'k' : passosDados;
}

// Gatilho do botão
document.getElementById('btn-saiba-mais-passos').addEventListener('click', () => {
    const valor = prompt("Digite os novos passos:");
    if(valor) atualizarDonutPassos(parseInt(valor));
});

