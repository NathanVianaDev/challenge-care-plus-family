document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('track-tratamentos');
    const setaEsq = document.getElementById('seta-esq');
    const setaDir = document.getElementById('seta-dir');
    const dots = document.querySelectorAll('#dots-container .dot');
    
    let slideAtual = 0;
    const totalSlides = dots.length;

    function atualizarCarrossel() {
        track.style.transform = `translateX(-${slideAtual * 100}%)`;
        
        dots.forEach(dot => dot.classList.remove('ativo'));
        dots[slideAtual].classList.add('ativo');
    }

    setaDir.addEventListener('click', () => {
        slideAtual = (slideAtual + 1) % totalSlides;
        atualizarCarrossel();
    });

    setaEsq.addEventListener('click', () => {
        slideAtual = (slideAtual - 1 + totalSlides) % totalSlides;
        atualizarCarrossel();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            slideAtual = parseInt(e.target.getAttribute('data-index'));
            atualizarCarrossel();
        });
    });
});