/**
 * AvatarPreview - Care Plus Family
 * Componente Modular para visualização do Avatar com camadas e injeção de CSS Global.
 */

const CSS_URL = '../../Components/AvatarPreview/AvatarPreview.css';

class AvatarPreview extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.imgBase = null;
        this.imgCabelo = null;
        this.imgOlhos = null; 
    }

    static get observedAttributes() {
        return ['genero', 'cabelo', 'olhos']; 
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!this.imgBase || !this.imgCabelo || !this.imgOlhos) return;
        
        if (name === 'genero') {
            this.atualizarGenero(newValue);
        } else if (name === 'cabelo') {
            this.atualizarCabelo(newValue);
        } else if (name === 'olhos') {
            this.atualizarOlhos(newValue); 
        }
    }

    connectedCallback() {
        this.render();
        this.injetarStyleGlobal();
        this.inicializarLogicaMenu(); 
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="${CSS_URL}">
            <div class="avatar-container">
                <img class="base" alt="Corpo Base">
                <img class="layer olhos" alt="Olhos"> 
                <img class="layer cabelo" alt="Cabelo">
            </div>
        `;

        this.imgBase = this.shadowRoot.querySelector('.base');
        this.imgCabelo = this.shadowRoot.querySelector('.cabelo');
        this.imgOlhos = this.shadowRoot.querySelector('.olhos'); 

        this.atualizarGenero(this.getAttribute('genero') || 'masculino');
        
        const cabeloInicial = this.getAttribute('cabelo');
        if (cabeloInicial) this.atualizarCabelo(cabeloInicial);

        const olhosIniciais = this.getAttribute('olhos'); 
        if (olhosIniciais) this.atualizarOlhos(olhosIniciais);
    }

    // --- MÉTODOS DE ATUALIZAÇÃO DO AVATAR ---
    atualizarGenero(genero) {
        const pasta = genero === 'masculino' ? 'Masculino' : 'Feminino';
        const arquivoBase = genero === 'masculino' ? 'Avatar_Masc_base.png' : 'Avatar_Fem_Base.png';
        const pathBase = `../../Images/Avatares/${pasta}/Base/${arquivoBase}`;
        
        this.imgBase.src = pathBase;
        
        this.imgBase.onerror = () => {
            this.imgBase.src = '../../Images/avatar-padrao.png';
            this.imgCabelo.classList.remove('visible');
            this.imgOlhos.classList.remove('visible');
        };

        this.imgCabelo.classList.remove('visible');
        this.imgOlhos.classList.remove('visible');
    }

    atualizarCabelo(cabeloId) {
        if (!cabeloId) {
            this.imgCabelo.classList.remove('visible');
            return;
        }
        const genero = this.getAttribute('genero') || 'masculino';
        const pasta = genero === 'masculino' ? 'Masculino' : 'Feminino';
        
        this.imgCabelo.classList.remove('visible');
        this.imgCabelo.onload = () => { this.imgCabelo.classList.add('visible'); };
        this.imgCabelo.src = `../../Images/Avatares/${pasta}/Cabelos/${cabeloId}.png`;
        this.imgCabelo.onerror = () => { this.imgCabelo.src = ''; };
    }

    atualizarOlhos(olhosId) {
        if (!olhosId) {
            this.imgOlhos.classList.remove('visible');
            return;
        }
        const genero = this.getAttribute('genero') || 'masculino';
        const pasta = genero === 'masculino' ? 'Masculino' : 'Feminino';

        this.imgOlhos.classList.remove('visible');
        this.imgOlhos.onload = () => { this.imgOlhos.classList.add('visible'); };
        
        // Caminho baseado no seu print
        this.imgOlhos.src = `../../Images/Avatares/${pasta}/Olhos/${olhosId}.png`;

        this.imgOlhos.onerror = () => { this.imgOlhos.src = ''; };
    }

    // --- LÓGICA DE INTERAÇÃO COM A UI ---
    inicializarLogicaMenu() {
        const btnMasc = document.getElementById('btn-masculino');
        const btnFem = document.getElementById('btn-feminino');
        const textAvatar = document.getElementById('text-avatar');
        
        const botoesMenuLateral = document.querySelectorAll('.menu-item-lateral');
        const gridOpcoes = document.getElementById('opcoes-grid');

        botoesMenuLateral.forEach((botao, index) => {
            botao.addEventListener('click', () => {
                botoesMenuLateral.forEach(b => b.classList.remove('active'));
                botao.classList.add('active');

                if (index === 0) {
                    this.carregarMenuCabelo(this.getAttribute('genero') || 'masculino');
                } else if (index === 1) {
                    this.carregarMenuOlhos(this.getAttribute('genero') || 'masculino');
                } else {
                    if (gridOpcoes) gridOpcoes.innerHTML = '';
                }
            });
        });

        if (btnMasc && btnFem) {
            const trocarGenero = (genero) => {
                this.setAttribute('genero', genero);
                this.setAttribute('cabelo', ''); 
                this.setAttribute('olhos', ''); 
                
                if (genero === 'masculino') {
                    btnMasc.setAttribute('active', 'true');
                    btnFem.removeAttribute('active');
                    if (textAvatar) textAvatar.style.color = '#0d6efd';
                } else {
                    btnFem.setAttribute('active', 'true');
                    btnMasc.removeAttribute('active');
                    if (textAvatar) textAvatar.style.color = '#E84D8A';
                }

                if (botoesMenuLateral[0] && botoesMenuLateral[0].classList.contains('active')) {
                    this.carregarMenuCabelo(genero);
                } else if (botoesMenuLateral[1] && botoesMenuLateral[1].classList.contains('active')) {
                    this.carregarMenuOlhos(genero);
                }
            };

            btnMasc.addEventListener('click', () => trocarGenero('masculino'));
            btnFem.addEventListener('click', () => trocarGenero('feminino'));
        }

        if (botoesMenuLateral[0]) {
            botoesMenuLateral[0].classList.add('active');
            this.carregarMenuCabelo(this.getAttribute('genero') || 'masculino');
        }
    }

    carregarMenuCabelo(genero) {
        const gridOpcoes = document.getElementById('opcoes-grid');
        if (!gridOpcoes) return;
        
        gridOpcoes.innerHTML = ''; 
        const quantidade = 10; 

        for (let i = 1; i <= quantidade; i++) {
            const numero = i.toString().padStart(2, '0');
            const nomeMascara = `opcao_${numero}`;
            const sufixo = genero === 'masculino' ? 'Masc' : 'Fem';
            const nomeArquivoReal = `Cabelo_${sufixo}_${numero}`;

            const item = document.createElement('div');
            item.style.width = 'calc(33.33% - 8px)'; 
            item.style.display = 'contents'; 

            item.innerHTML = `
                <div class="item-opcao shadow-sm" data-item="${nomeArquivoReal}">
                    <img src="../../Images/Avatares/${genero === 'masculino' ? 'Masculino' : 'Feminino'}/Cabelos/Mascaras/${nomeMascara}.png" 
                        onerror="this.src='../../Images/placeholder.png';">
                </div>
            `;

            item.querySelector('.item-opcao').addEventListener('click', (e) => {
                this.setAttribute('cabelo', nomeArquivoReal);
                document.querySelectorAll('.item-opcao').forEach(el => el.classList.remove('item-active'));
                e.currentTarget.classList.add('item-active');
            });

            gridOpcoes.appendChild(item);
        }
    }

    carregarMenuOlhos(genero) {
        const gridOpcoes = document.getElementById('opcoes-grid');
        if (!gridOpcoes) return;
        
        gridOpcoes.innerHTML = ''; 
        const quantidade = 3; 

        for (let i = 1; i <= quantidade; i++) {
            const numero = i.toString().padStart(2, '0');
            // Ajustado conforme o print: perfilopcao_01
            const nomeMascara = `perfilopcao_${numero}`;
            const sufixo = genero === 'masculino' ? 'Masc' : 'Fem';
            // Ajustado conforme o print: Olhos_Fem_01
            const nomeArquivoReal = `Olhos_${sufixo}_${numero}`;

            const item = document.createElement('div');
            item.style.width = 'calc(33.33% - 8px)'; 
            item.style.display = 'contents'; 

            item.innerHTML = `
                <div class="item-opcao shadow-sm" data-item="${nomeArquivoReal}">
                    <img src="../../Images/Avatares/${genero === 'masculino' ? 'Masculino' : 'Feminino'}/Olhos/Mascaras/${nomeMascara}.png" 
                        onerror="this.src='../../Images/placeholder.png';">
                </div>
            `;

            item.querySelector('.item-opcao').addEventListener('click', (e) => {
                this.setAttribute('olhos', nomeArquivoReal);
                document.querySelectorAll('.item-opcao').forEach(el => el.classList.remove('item-active'));
                e.currentTarget.classList.add('item-active');
            });

            gridOpcoes.appendChild(item);
        }
    }

    async injetarStyleGlobal() {
        try {
            if (document.getElementById('avatar-preview-global-style')) return;
            const resposta = await fetch(CSS_URL);
            const cssString = await resposta.text();
            const styleElement = document.createElement('style');
            styleElement.id = 'avatar-preview-global-style'; 
            styleElement.textContent = cssString;
            document.head.appendChild(styleElement);
        } catch (error) {
            console.error("⚠️ Falha ao injetar CSS:", error);
        }
    }
}

if (!customElements.get('avatar-preview')) {
    customElements.define('avatar-preview', AvatarPreview);
}