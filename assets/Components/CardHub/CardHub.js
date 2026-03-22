export class MonitorPassos extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const degrade = this.getAttribute('cor') || 'linear-gradient(205deg, #34D052, #ffffff)';
        this.render(degrade);
        this.initLogic();
    }

    initLogic() {
        const btnAbrir = this.shadowRoot.querySelector('#btn-abrir');
        const btnFechar = this.shadowRoot.querySelector('#btn-fechar');
        const modal = this.shadowRoot.querySelector('.modal-interativo');
        const inputAtual = this.shadowRoot.querySelector('#input-atual');
        const inputMeta = this.shadowRoot.querySelector('#input-meta');
        const progresso = this.shadowRoot.querySelector('.circulo-progresso');
        const txtQuantidade = this.shadowRoot.querySelector('.quantidade');
        const txtLabelMeta = this.shadowRoot.querySelector('.label');

        // Função que calcula e aplica a animação
        const dispararAnimacao = () => {
            const atual = parseInt(inputAtual.value) || 0;
            const meta = parseInt(inputMeta.value) || 1;
            const porcentagem = Math.min(100, (atual / meta) * 100);
            
            // Atualiza os textos
            txtQuantidade.textContent = atual.toLocaleString();
            txtLabelMeta.textContent = `meta ${Math.round(meta/1000)}k`;

            // Aplica o valor ao SVG (A transição CSS faz o resto)
            progresso.style.strokeDasharray = `${porcentagem}, 100`;
        };

        btnAbrir.onclick = () => {
            modal.classList.add('active');
        };

        // AO CLICAR EM SALVAR:
        btnFechar.onclick = () => {
            modal.classList.remove('active');
            
            // Pequeno truque: resetamos visualmente para 0 e disparamos a animação 
            // logo em seguida para dar o efeito de "carregamento" toda vez que salva
            progresso.style.strokeDasharray = "0, 100"; 
            
            setTimeout(() => {
                dispararAnimacao();
            }, 300); // Espera o modal começar a fechar para iniciar a corrida da barra
        };

        // Também mantém a atualização em tempo real enquanto digita, se desejar
        inputAtual.oninput = dispararAnimacao;
        inputMeta.oninput = dispararAnimacao;

        // Executa ao carregar a página pela primeira vez
        setTimeout(dispararAnimacao, 500);
    }

    render(degrade) {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./assets/Components/CardHub/CardHub.css">
        <div class="Card" style="background: ${degrade}">
            <span class="titulo-monitor">PASSOS</span>
            
            <div class="grafico-circular">
                <svg class="svg-progresso" viewBox="0 0 36 36">
                    <path class="circulo-fundo" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path class="circulo-progresso" stroke-dasharray="0, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div class="textos-centro">
                    <span class="quantidade">0</span>
                    <span class="label">meta 10k</span>
                </div>
            </div>

            <button class="btn-interativo" id="btn-abrir">SAIBA MAIS</button>

            <div class="modal-interativo">
                <p>Objetivo (Meta):</p>
                <input type="number" id="input-meta" value="10000">
                <p>Já realizado:</p>
                <input type="number" id="input-atual" value="7500">
                <button class="btn-interativo" id="btn-fechar">SALVAR</button>
            </div>
        </div>
        `;
    }
}   

customElements.define('monitor-passos', MonitorPassos);