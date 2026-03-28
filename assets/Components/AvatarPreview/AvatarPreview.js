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
    }

    static get observedAttributes() {
        return ['genero', 'cabelo'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!this.imgBase || !this.imgCabelo) return;
        
        if (name === 'genero') {
            this.atualizarGenero(newValue);
        } else if (name === 'cabelo') {
            this.atualizarCabelo(newValue);
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
                <img class="layer cabelo" alt="Cabelo">
            </div>
        `;

        this.imgBase = this.shadowRoot.querySelector('.base');
        this.imgCabelo = this.shadowRoot.querySelector('.cabelo');

        this.atualizarGenero(this.getAttribute('genero') || 'masculino');
        const cabeloInicial = this.getAttribute('cabelo');
        if (cabeloInicial) {
            this.atualizarCabelo(cabeloInicial);
        }
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
        };

        this.imgCabelo.classList.remove('visible');
    }

    atualizarCabelo(cabeloId) {
        if (!cabeloId) {
            this.imgCabelo.classList.remove('visible');
            return;
        }

        const genero = this.getAttribute('genero') || 'masculino';
        const pasta = genero === 'masculino' ? 'Masculino' : 'Feminino';
        
        this.imgCabelo.classList.remove('visible');

        this.imgCabelo.onload = () => {
            this.imgCabelo.classList.add('visible');
        };

        this.imgCabelo.src = `../../Images/Avatares/${pasta}/Cabelos/${cabeloId}.png`;
        
        this.imgCabelo.onerror = () => {
            this.imgCabelo.src = ''; 
        };
    }

    // --- LÓGICA DE INTERAÇÃO COM A UI ---
    inicializarLogicaMenu() {
        const btnMasc = document.getElementById('btn-masculino');
        const btnFem = document.getElementById('btn-feminino');
        const textAvatar = document.getElementById('text-avatar');
        
        // Seleciona os 3 botões do menu lateral (Geral)
        const botoesMenuLateral = document.querySelectorAll('.menu-item-lateral');
        const gridOpcoes = document.getElementById('opcoes-grid');

        // Lógica dos 3 botões do Menu Lateral
        botoesMenuLateral.forEach((botao, index) => {
            botao.addEventListener('click', () => {
                // Remove classe ativa de todos e adiciona no clicado
                botoesMenuLateral.forEach(b => b.classList.remove('active'));
                botao.classList.add('active');

                if (index === 0) {
                    // BOTÃO 1: Cabelos (Carrega a lógica pronta)
                    this.carregarMenuCabelo(this.getAttribute('genero') || 'masculino');
                } else {
                    // BOTÃO 2 e 3: Limpa o grid (fica branco)
                    if (gridOpcoes) gridOpcoes.innerHTML = '';
                }
            });
        });

        // Lógica de Gênero
        if (btnMasc && btnFem) {
            const trocarGenero = (genero) => {
                this.setAttribute('genero', genero);
                this.setAttribute('cabelo', ''); 
                
                if (genero === 'masculino') {
                    btnMasc.setAttribute('active', 'true');
                    btnFem.removeAttribute('active');
                    if (textAvatar) textAvatar.style.color = '#0d6efd';
                } else {
                    btnFem.setAttribute('active', 'true');
                    btnMasc.removeAttribute('active');
                    if (textAvatar) textAvatar.style.color = '#E84D8A';
                }

                // Só recarrega o menu se o primeiro botão (Cabelo) estiver ativo
                if (botoesMenuLateral[0] && botoesMenuLateral[0].classList.contains('active')) {
                    this.carregarMenuCabelo(genero);
                }
            };

            btnMasc.addEventListener('click', () => trocarGenero('masculino'));
            btnFem.addEventListener('click', () => trocarGenero('feminino'));
        }

        // Inicializa o primeiro botão como ativo e carrega o menu de cabelos
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