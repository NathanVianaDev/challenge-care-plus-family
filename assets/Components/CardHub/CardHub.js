// assets/Components/CardHub/CardHub.js

export class MonitorPassos extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const titulo = this.getAttribute('titulo') || 'PASSOS';
        const atual = this.getAttribute('atual') || '0';
        const meta = this.getAttribute('meta') || '10000';
        
        // CORREÇÃO: Usar 'cor' para bater com o HTML
        const degrade = this.getAttribute('cor') || 'linear-gradient(205deg, #34D052, #ffffff)';
        
        // Cálculo do gráfico
        const porcentagem = Math.min(100, (parseInt(atual) / parseInt(meta)) * 100);
        const circunferencia = 251; // Circunferência para um círculo menor (r=40)
        const offset = circunferencia - (porcentagem / 100) * circunferencia;

        // Passamos o degradê para o render
        this.render(titulo, atual, circunferencia, offset, degrade);
    }

    render(titulo, atual, circunferencia, offset, degrade) {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./assets/Components/CardHub/CardHub.css">
        <div class="Card" style="background: ${degrade}">
            
        </div>
        `;
    }
}

customElements.define('monitor-passos', MonitorPassos);