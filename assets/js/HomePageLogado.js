document.addEventListener('DOMContentLoaded', () => {
    const btnAbrir = document.getElementById('btn-meus-encaixes');
    const modal = document.getElementById('modalMeusEncaixes');
    const msgContainer = document.getElementById('mensagemEncaixe');
    
    const btnFechar = document.getElementById('btnFecharEncaixe');
    const btnDesistir = document.getElementById('btnDesistirEncaixe');

    if (btnAbrir && modal) {
        btnAbrir.addEventListener('click', () => {
            msgContainer.innerHTML = `
                Você tem um encaixe <strong style="color: #f39c12;">aguardando</strong> 
                disponibilidade da unidade para o dia <strong>04/05/2026</strong> 
                na parte da <strong>tarde</strong>.
            `;
            
            modal.classList.remove('hidden');
        });

        btnFechar.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        btnDesistir.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.add('hidden');
        });
    }
});