class AvatarPreview extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() { return ['genero']; }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) this.render();
    }

    connectedCallback() { this.render(); }

    get genero() { return this.getAttribute('genero') || 'masculino'; }

    render() {
        const pasta = this.genero === 'masculino' ? 'Masculino' : 'Feminino';
        // Note o 'Base' com B maiúsculo e o nome do arquivo exato do seu VS Code
        const arquivo = this.genero === 'masculino' ? 'Avatar_Masc_base.png' : 'Avatar_Fem_Base.png';
        const path = `../../Images/Avatares/${pasta}/Base/${arquivo}`;

        this.shadowRoot.innerHTML = `
            <style>
                :host { display: flex; justify-content: center; width: 100%; }
                img { max-width: 100%; height: auto; max-height: 600px; object-fit: contain; }
            </style>
            <img src="${path}" alt="Avatar" onerror="this.src='../../Images/avatar-padrao.png'">
        `;
    }
}
customElements.define('avatar-preview', AvatarPreview);