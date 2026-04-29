document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('track-tratamentos');
    const setaEsq = document.getElementById('seta-esq');
    const setaDir = document.getElementById('seta-dir');
    const dots = document.querySelectorAll('#dots-container .dot');
    
    let slideAtual = 0;
    const totalSlides = dots.length;

    // Função que atualiza a posição e as bolinhas do carrossel
    function atualizarCarrossel() {
        // Move a trilha usando porcentagem (100% = 1 slide inteiro)
        track.style.transform = `translateX(-${slideAtual * 100}%)`;
        
        // Atualiza o visual da bolinha ativa
        dots.forEach(dot => dot.classList.remove('ativo'));
        dots[slideAtual].classList.add('ativo');
    }

    // Clique na Seta Direita
    setaDir.addEventListener('click', () => {
        slideAtual = (slideAtual + 1) % totalSlides; // Volta para o 0 ao chegar no fim
        atualizarCarrossel();
    });

    // Clique na Seta Esquerda
    setaEsq.addEventListener('click', () => {
        slideAtual = (slideAtual - 1 + totalSlides) % totalSlides; // Vai pro último se estiver no 0
        atualizarCarrossel();
    });

    // Clique direto nas bolinhas
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            slideAtual = parseInt(e.target.getAttribute('data-index'));
            atualizarCarrossel();
        });
    });
});