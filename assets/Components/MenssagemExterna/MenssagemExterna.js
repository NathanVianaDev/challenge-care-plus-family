const CSS_URL = '../../Components/MenssagemExterna/MenssagemExterna.css';

class MenssagemExterna extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['titulo', 'texto', 'link', 'botao'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    fecharERedirecionar() {
        const link = this.getAttribute('link');
        if (link) {
            window.location.href = link;
        } else {
            this.style.display = 'none';
        }
    }

    render() {
        const titulo = this.getAttribute('titulo') || 'Sucesso!';
        const texto = this.getAttribute('texto') || 'Operação realizada.';
        const botao = this.getAttribute('botao') || 'Entendi';

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${CSS_URL}">
            <div class="modal-overlay">
                <div class="custom-modal">
                    <!-- Logo da Care Plus fixa no componente -->
                    <img src="/assets/Images/logo-care-plus.png" alt="Care Plus" class="modal-logo">
                    
                    <h3 class="modal-title">${titulo}</h3>
                    <p class="modal-message">${texto}</p>
                    
                    <button class="btn-modal" id="btn-acao">${botao}</button>
                </div>
            </div>
        `;

        this.shadowRoot.querySelector('#btn-acao').addEventListener('click', () => {
            this.fecharERedirecionar();
        });
    }
}

if (!customElements.get('menssagem-externa')) {
    customElements.define('menssagem-externa', MenssagemExterna);
}