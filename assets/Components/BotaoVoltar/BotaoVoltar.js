class BotaoVoltar extends HTMLElement {
    connectedCallback() {
        const href = this.getAttribute('href');
        const texto = this.getAttribute('texto') || 'Voltar';
        
        const acaoClick = href ? `window.location.href='${href}'` : 'window.history.back()';

        this.innerHTML = `
            <button class="btn btn-outline-secondary btn-voltar-custom shadow-sm mb-3" onclick="${acaoClick}">
                <i class="bi bi-arrow-left"></i> <span class="texto-voltar">${texto}</span>
            </button>
        `;
    }
}

customElements.define('botao-voltar', BotaoVoltar);