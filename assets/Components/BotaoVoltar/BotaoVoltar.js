// assets/Components/BotaoVoltar/BotaoVoltar.js

class BotaoVoltar extends HTMLElement {
    connectedCallback() {
        // Pega os atributos customizados, se existirem
        const href = this.getAttribute('href');
        const texto = this.getAttribute('texto') || 'Voltar'; // 'Voltar' é o texto padrão
        
        // Define a ação: se tiver href vai pra ele, se não, usa o histórico do navegador
        const acaoClick = href ? `window.location.href='${href}'` : 'window.history.back()';

        this.innerHTML = `
            <button class="btn btn-outline-secondary btn-voltar-custom shadow-sm mb-3" onclick="${acaoClick}">
                <i class="bi bi-arrow-left"></i> <span class="texto-voltar">${texto}</span>
            </button>
        `;
    }
}

// Define a tag <botao-voltar> para ser usada no HTML
customElements.define('botao-voltar', BotaoVoltar);