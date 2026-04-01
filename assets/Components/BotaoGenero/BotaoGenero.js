class BotaoGenero extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['active'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const button = this.shadowRoot.querySelector('.btn-gender');
        if (button) {
            if (this.isActive) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        }
    }

    get genero() {
        return this.getAttribute('genero') || 'masculino';
    }

    get isActive() {
        return this.getAttribute('active') === 'true';
    }

    render() {
        const isMasc = this.genero === 'masculino';
        const icon = isMasc ? 'bi-gender-male' : 'bi-gender-female';
        const label = isMasc ? 'Masculino' : 'Feminino';
        const activeClass = this.isActive ? 'active' : '';

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
            <link rel="stylesheet" href="../../Components/BotaoGenero/BotaoGenero.css">
            <button type="button" class="btn-gender ${this.genero} ${activeClass}">
                <i class="bi ${icon}"></i>
                <span>${label}</span>
            </button>
        `;
    }
}

customElements.define('botao-genero', BotaoGenero);

// Lógica de controle da página (Botões + Cor do Texto Avatar)
document.addEventListener('DOMContentLoaded', () => {
    const btnMasc = document.getElementById('btn-masculino');
    const btnFem = document.getElementById('btn-feminino');
    const textAvatar = document.getElementById('text-avatar');

    function atualizarEstado(genero) {
        if (!textAvatar) return;
        
        // Sincroniza a cor do texto "Avatar"
        if (genero === 'masculino') {
            btnMasc.setAttribute('active', 'true');
            btnFem.removeAttribute('active');
            textAvatar.style.color = '#0d6efd'; // Azul
        } else {
            btnFem.setAttribute('active', 'true');
            btnMasc.removeAttribute('active');
            textAvatar.style.color = '#E84D8A'; // Rosa
        }
    }

    if (btnMasc && btnFem) {
        btnMasc.addEventListener('click', () => atualizarEstado('masculino'));
        btnFem.addEventListener('click', () => atualizarEstado('feminino'));
        
        // Inicialização: Se o masculino começa ativo, pinta o texto de azul
        if (btnMasc.hasAttribute('active')) {
            textAvatar.style.color = '#0d6efd';
        }
    }
});