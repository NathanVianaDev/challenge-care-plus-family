export class CardHubUniversal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.titulo = this.getAttribute('titulo') || 'Monitor';
        this.unidade = this.getAttribute('unidade') || '';
        this.corFundo = this.getAttribute('cor') || 'linear-gradient(205deg, #34D052, #ffffff)';
        this.corProgresso = this.getAttribute('cor-progresso') || '#34D052';
        this.iconPath = this.getAttribute('icon-path') || '';
        
        this.viewBox = this.getAttribute('viewbox') || '0 0 24 24';

        this.labelEsq = this.getAttribute('label-esq') || '';
        this.labelDir = this.getAttribute('label-dir') || '';
        this.valorEsqPadrao = this.getAttribute('valor-esq') || '0';
        this.valorDirPadrao = this.getAttribute('valor-dir') || '0';

        this.render();
        this.initLogic();
    }

    initLogic() {
        const modal = this.shadowRoot.querySelector('.modal-interativo');
        const inputAtual = this.shadowRoot.querySelector('#input-atual');
        const inputMeta = this.shadowRoot.querySelector('#input-meta');
        const progresso = this.shadowRoot.querySelector('.circulo-progresso');
        const txtQuantidade = this.shadowRoot.querySelector('.quantidade');
        const txtLabelMeta = this.shadowRoot.querySelector('.label');
        const txtData = this.shadowRoot.querySelector('.data-atual');
        
        const valEsq = this.shadowRoot.querySelector('#val-esq');
        const valDir = this.shadowRoot.querySelector('#val-dir');

        const hoje = new Date();
        txtData.textContent = hoje.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '');

        const dispararAnimacao = () => {
            const atual = parseInt(inputAtual.value) || 0;
            const meta = parseInt(inputMeta.value) || 1;
            const porcentagem = Math.min(100, (atual / meta) * 100);
            
            txtQuantidade.textContent = atual.toLocaleString();
            txtLabelMeta.textContent = this.titulo === 'Passos' ? `/${meta}` : this.unidade;

            if (this.titulo === 'Passos') {
                valEsq.textContent = `${(atual * 0.045).toFixed(0)} kcal`;
                valDir.textContent = `${(atual / 1320).toFixed(1).replace('.', ',')} km`;
            }

            if (this.titulo === 'BPM') {
                valEsq.textContent = `${(atual * 0.045).toFixed(0)} bpm`;
                valDir.textContent = `${(atual / 1320).toFixed(1).replace('.', ',')} bpm`;
            }

            if (this.titulo === 'Glicemia') {
                valEsq.textContent = `${(atual * 0.045).toFixed(0)} mg/dL`;
                valDir.textContent = `${(atual / 1320).toFixed(1).replace('.', ',')} mg/dl`;
            }

            if (this.titulo === 'Água') {
                valEsq.textContent = `${(atual * 0.045).toFixed(0)} L`;
                valDir.textContent = `${(atual / 1320).toFixed(1).replace('.', ',')} L`;
            }

            if (this.titulo === 'Sono') {
                valEsq.textContent = `${(atual * 0.045).toFixed(0)} h`;
                valDir.textContent = `${(atual / 1320).toFixed(1).replace('.', ',')} h`;
            }

            progresso.style.strokeDasharray = `${porcentagem}, 100`;
        };

        this.shadowRoot.querySelector('#btn-abrir').onclick = () => modal.classList.add('active');
        this.shadowRoot.querySelector('#btn-fechar').onclick = () => {
            modal.classList.remove('active');
            progresso.style.strokeDasharray = "0, 100"; 
            setTimeout(dispararAnimacao, 300);
        };

        inputAtual.oninput = dispararAnimacao;
        inputMeta.oninput = dispararAnimacao;
        setTimeout(dispararAnimacao, 500);
    }

    render() {
        const caminhoCardHubCSS = new URL('./CardHub.css', import.meta.url).href;
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="${caminhoCardHubCSS}">
        <div class="Card" style="background: ${this.corFundo}">
            <div class="cabecalho">
                <span class="titulo-monitor">${this.titulo}</span>
                <span class="data-atual"></span>
            </div>
            
            <div class="grafico-circular">
                <svg class="svg-progresso" viewBox="0 0 36 36">
                    <path class="circulo-fundo" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path class="circulo-progresso" style="stroke: ${this.corProgresso}" stroke-dasharray="0, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="textos-centro">
                    <svg class="icon-corredor" viewBox="${this.viewBox}" fill="white" stroke="white" stroke-width="1.2">
                        <path d="${this.iconPath}" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="quantidade">0</span>
                    <span class="label"></span>
                </div>
            </div>

            <div class="info-adicional"> 
                <div class="item-info">
                    <span class="info-label">${this.labelEsq}</span>
                    <span id="val-esq" class="info-valor">${this.valorEsqPadrao}</span>
                </div>
                <div class="divisor"></div>
                <div class="item-info">
                    <span class="info-label">${this.labelDir}</span>   
                    <span id="val-dir" class="info-valor">${this.valorDirPadrao}</span>
                </div>
            </div>

            <button class="btn-interativo" id="btn-abrir" style="background: ${this.getAttribute('cor-botao') || '#92C444'}">Saiba Mais</button>

            <div class="modal-interativo">
                <p>Meta/Valor (${this.titulo}):</p>
                <input type="number" id="input-meta" value="${this.getAttribute('meta-padrao') || 100}">
                <p>Valor Atual:</p>
                <input type="number" id="input-atual" value="0">
                <button class="btn-interativo" id="btn-fechar">SALVAR</button>
            </div>
        </div>
        `;
    }
}
customElements.define('card-hub', CardHubUniversal);