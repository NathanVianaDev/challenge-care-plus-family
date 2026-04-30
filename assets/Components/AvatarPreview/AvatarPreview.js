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
        this.imgBoca = null;
        this.imgRoupa = null; 
    }

    static get observedAttributes() {
        return ['genero', 'cabelo', 'olhos', 'boca', 'roupa']; 
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!this.imgBase || !this.imgCabelo || !this.imgOlhos || !this.imgBoca || !this.imgRoupa) return;
        
        if (name === 'genero') {
            this.atualizarGenero(newValue);
        } else if (name === 'cabelo') {
            this.atualizarCabelo(newValue);
        } else if (name === 'olhos') {
            this.atualizarOlhos(newValue); 
        } else if (name === 'boca') {
            this.atualizarBoca(newValue); 
        } else if (name === 'roupa') {
            this.atualizarRoupa(newValue);
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
                <img class="layer roupa" alt="Roupa">
                <img class="layer boca" alt="Boca"> 
                <img class="layer olhos" alt="Olhos"> 
                <img class="layer cabelo" alt="Cabelo">
            </div>
        `;

        this.imgBase = this.shadowRoot.querySelector('.base');
        this.imgCabelo = this.shadowRoot.querySelector('.cabelo');
        this.imgOlhos = this.shadowRoot.querySelector('.olhos'); 
        this.imgBoca = this.shadowRoot.querySelector('.boca');
        this.imgRoupa = this.shadowRoot.querySelector('.roupa');

        this.atualizarGenero(this.getAttribute('genero') || 'masculino');
        
        const cabeloInicial = this.getAttribute('cabelo');
        if (cabeloInicial) this.atualizarCabelo(cabeloInicial);

        const olhosIniciais = this.getAttribute('olhos'); 
        if (olhosIniciais) this.atualizarOlhos(olhosIniciais);

        const bocaInicial = this.getAttribute('boca'); 
        if (bocaInicial) this.atualizarBoca(bocaInicial);

        const roupaInicial = this.getAttribute('roupa');
        if (roupaInicial) this.atualizarRoupa(roupaInicial);
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
            this.imgBoca.classList.remove('visible');
            this.imgRoupa.classList.remove('visible');
        };

        this.imgCabelo.classList.remove('visible');
        this.imgOlhos.classList.remove('visible');
        this.imgBoca.classList.remove('visible');
        this.imgRoupa.classList.remove('visible');
    }

    atualizarCabelo(cabeloId) {
        if (!cabeloId) { this.imgCabelo.classList.remove('visible'); return; }
        const genero = this.getAttribute('genero') || 'masculino';
        const pasta = genero === 'masculino' ? 'Masculino' : 'Feminino';
        this.imgCabelo.classList.remove('visible');
        this.imgCabelo.onload = () => { this.imgCabelo.classList.add('visible'); };
        this.imgCabelo.src = `../../Images/Avatares/${pasta}/Cabelos/${cabeloId}.png`;
    }

    atualizarOlhos(olhosId) {
        if (!olhosId) { this.imgOlhos.classList.remove('visible'); return; }
        const genero = this.getAttribute('genero') || 'masculino';
        const pasta = genero === 'masculino' ? 'Masculino' : 'Feminino';
        this.imgOlhos.classList.remove('visible');
        this.imgOlhos.onload = () => { this.imgOlhos.classList.add('visible'); };
        this.imgOlhos.src = `../../Images/Avatares/${pasta}/Olhos/${olhosId}.png`;
    }

    atualizarBoca(bocaId) {
        if (!bocaId) { this.imgBoca.classList.remove('visible'); return; }
        const genero = this.getAttribute('genero') || 'masculino';
        const pasta = genero === 'masculino' ? 'Masculino' : 'Feminino';
        this.imgBoca.classList.remove('visible');
        this.imgBoca.onload = () => { this.imgBoca.classList.add('visible'); };
        this.imgBoca.src = `../../Images/Avatares/${pasta}/Boca/${bocaId}.png`;
    }

    atualizarRoupa(roupaId) {
        if (!roupaId) { this.imgRoupa.classList.remove('visible'); return; }
        const genero = this.getAttribute('genero') || 'masculino';
        const pasta = genero === 'masculino' ? 'Masculino' : 'Feminino';
        this.imgRoupa.classList.remove('visible');
        this.imgRoupa.onload = () => { this.imgRoupa.classList.add('visible'); };
        this.imgRoupa.src = `../../Images/Avatares/${pasta}/Roupas/${roupaId}.png`;
    }

    // --- LÓGICA DE INTERAÇÃO COM A UI ---
    inicializarLogicaMenu() {
        const btnMasc = document.getElementById('btn-masculino');
        const btnFem = document.getElementById('btn-feminino');
        const textAvatar = document.getElementById('text-avatar');
        const botoesMenuLateral = document.querySelectorAll('.menu-item-lateral');
        const gridOpcoes = document.getElementById('opcoes-grid');

        // LÓGICA DO BOTÃO SALVAR
        const btnSalvar = document.getElementById('btn-salvar-avatar');
        if (btnSalvar) {
            btnSalvar.addEventListener('click', () => {
                const config = {
                    genero: this.getAttribute('genero'),
                    cabelo: this.getAttribute('cabelo'),
                    olhos: this.getAttribute('olhos'),
                    boca: this.getAttribute('boca'),
                    roupa: this.getAttribute('roupa')
                };
                localStorage.setItem('careplus_avatar', JSON.stringify(config));
            });
        }

        botoesMenuLateral.forEach((botao, index) => {
            botao.addEventListener('click', () => {
                botoesMenuLateral.forEach(b => b.classList.remove('active'));
                botao.classList.add('active');

                if (index === 0) {
                    this.carregarMenuCabelo(this.getAttribute('genero') || 'masculino');
                } else if (index === 1) {
                    this.carregarMenuOlhos(this.getAttribute('genero') || 'masculino');
                } else if (index === 2) {
                    this.carregarMenuBoca(this.getAttribute('genero') || 'masculino');
                } else if (index === 3) {
                    this.carregarMenuRoupas(this.getAttribute('genero') || 'masculino');
                } else {
                    if (gridOpcoes) gridOpcoes.innerHTML = '';
                }
            });
        });

        if (btnMasc && btnFem) {
            const trocarGenero = (genero) => {
                this.setAttribute('genero', genero);
                this.setAttribute('cabelo', ''); this.setAttribute('olhos', ''); 
                this.setAttribute('boca', ''); this.setAttribute('roupa', ''); 
                
                if (genero === 'masculino') {
                    btnMasc.setAttribute('active', 'true'); btnFem.removeAttribute('active');
                    if (textAvatar) textAvatar.style.color = '#0d6efd';
                } else {
                    btnFem.setAttribute('active', 'true'); btnMasc.removeAttribute('active');
                    if (textAvatar) textAvatar.style.color = '#E84D8A';
                }

                const ativo = Array.from(botoesMenuLateral).findIndex(b => b.classList.contains('active'));
                if (ativo === 0) this.carregarMenuCabelo(genero);
                else if (ativo === 1) this.carregarMenuOlhos(genero);
                else if (ativo === 2) this.carregarMenuBoca(genero);
                else if (ativo === 3) this.carregarMenuRoupas(genero);
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
        for (let i = 1; i <= 10; i++) {
            const num = i.toString().padStart(2, '0');
            const sufixo = genero === 'masculino' ? 'Masc' : 'Fem';
            const nomeArq = `Cabelo_${sufixo}_${num}`;
            this.criarItemGrid(gridOpcoes, nomeArq, `Cabelos/Mascaras/opcao_${num}`, 'cabelo');
        }
    }

    carregarMenuOlhos(genero) {
        const gridOpcoes = document.getElementById('opcoes-grid');
        if (!gridOpcoes) return;
        gridOpcoes.innerHTML = ''; 
        for (let i = 1; i <= 3; i++) {
            const num = i.toString().padStart(2, '0');
            const sufixo = genero === 'masculino' ? 'Masc' : 'Fem';
            const nomeArq = `Olhos_${sufixo}_${num}`;
            this.criarItemGrid(gridOpcoes, nomeArq, `Olhos/Mascaras/perfilopcao_${num}`, 'olhos');
        }
    }

    carregarMenuBoca(genero) {
        const gridOpcoes = document.getElementById('opcoes-grid');
        if (!gridOpcoes) return;
        gridOpcoes.innerHTML = ''; 
        for (let i = 1; i <= 2; i++) {
            const num = i.toString().padStart(2, '0');
            const sufixo = genero === 'masculino' ? 'Masc' : 'Fem';
            const nomeArq = `Boca_${sufixo}_${num}`;
            this.criarItemGrid(gridOpcoes, nomeArq, `Boca/Mascaras/opcao_${num}`, 'boca');
        }
    }

    carregarMenuRoupas(genero) {
        const gridOpcoes = document.getElementById('opcoes-grid');
        if (!gridOpcoes) return;
        gridOpcoes.innerHTML = ''; 
        for (let i = 1; i <= 3; i++) {
            const num = i.toString().padStart(2, '0');
            const sufixo = genero === 'masculino' ? 'Masc' : 'Fem';
            const nomeArq = `Roupas_${sufixo}_${num}`;
            this.criarItemGrid(gridOpcoes, nomeArq, `Roupas/Mascaras/opcao_${num}`, 'roupa');
        }
    }

    criarItemGrid(container, nomeArquivo, pathMascara, atributo) {
        const genero = this.getAttribute('genero') || 'masculino';
        const pasta = genero === 'masculino' ? 'Masculino' : 'Feminino';
        
        const item = document.createElement('div');
        item.style.width = 'calc(33.33% - 8px)'; 
        item.style.display = 'contents'; 
        item.innerHTML = `
            <div class="item-opcao shadow-sm" data-item="${nomeArquivo}">
                <img src="../../Images/Avatares/${pasta}/${pathMascara}.png" onerror="this.src='../../Images/placeholder.png';">
            </div>
        `;
        item.querySelector('.item-opcao').addEventListener('click', (e) => {
            this.setAttribute(atributo, nomeArquivo);
            document.querySelectorAll('.item-opcao').forEach(el => el.classList.remove('item-active'));
            e.currentTarget.classList.add('item-active');
        });
        container.appendChild(item);
    }

    async injetarStyleGlobal() {
        try {
            if (document.getElementById('avatar-preview-global-style')) return;
            const res = await fetch(CSS_URL);
            const css = await res.text();
            const style = document.createElement('style');
            style.id = 'avatar-preview-global-style'; 
            style.textContent = css;
            document.head.appendChild(style);
        } catch (e) { console.error(e); }
    }
}

if (!customElements.get('avatar-preview')) {
    customElements.define('avatar-preview', AvatarPreview);
}