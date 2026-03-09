// ranking.js - Focado apenas no corpo da pagina

function carregarPerfilRanking() {
    const usuarioLogado = { nome: "Pacheco", foto: "/assets/Images/avatar-padrao.png" };
    
    const elementoNome = document.getElementById('display-name');
    const elementoFoto = document.getElementById('user-photo');

    // Apenas tenta mudar se o elemento existir na tela, evitando o erro de 'null'
    if (elementoNome) { 
        elementoNome.innerText = usuarioLogado.nome; 
    }
    if (elementoFoto) { 
        elementoFoto.src = usuarioLogado.foto; 
    }
}

function animarBarrasRanking() {
    const barras = document.querySelectorAll('.progress-bar');
    barras.forEach(barra => {
        const valorFinal = barra.getAttribute('data-target'); 
        if (valorFinal) {
            setTimeout(() => {
                barra.style.width = valorFinal + '%'; 
                barra.innerText = valorFinal + '% Completo';
            }, 300);
        }
    });
}

// Executa as animações ao carregar a página
window.addEventListener('load', () => {
    carregarPerfilRanking();
    animarBarrasRanking();
});

/**
 * Troca a imagem de fundo do avatar
 * @param {string} nomeArquivo Ex: 'fundo-avatar02.png'
 */

function mudarFundo(nomeArquivo) {
    const img = document.getElementById('img-avatar-bg');
    
    if (img) {
        // Caso a estrutura de pastas seja diferente, ajuste o caminho abaixo 
        img.src = `/assets/Images/${nomeArquivo}`;
        console.log("Fundo alterado com sucesso para:", nomeArquivo);
    } else {
        console.error("Erro: A tag img com id 'img-avatar-bg' não foi encontrada.");
    }
}