export class PainelTarefas extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="tarefas-container">
                <h2 class="tarefas-title">Tarefas gerais</h2>
                <div class="tarefas-lista">
                    <div class="tarefas-header">
                        <div class="col-num">#</div>
                        <div class="col-desc">Descrição da Tarefa</div>
                        <div class="col-pontos">Pontos</div>
                        <div class="col-status">Status</div>
                    </div>
                    
                    ${this.createTarefa(1, "Dar 10.000 Passos por dia", 150, 75, "yellow")}
                    ${this.createTarefa(2, "Beber 3 Litros de água", 100, 100, "green")}
                    ${this.createTarefa(3, "Realizar 01 consulta no semestre", 200, 0, "red")}
                    ${this.createTarefa(4, "Realizar 01 consulta psicológica", 200, 0, "red")}
                    ${this.createTarefa(5, "Realizar 01 limpeza dentária", 200, 100, "green")}
                    ${this.createTarefa(6, "Participar de 01 vídeo aula", 75, 100, "green")}
                    ${this.createTarefa(7, "Acessar o site diariamente", 100, 100, "green")}
                </div>
            </div>
        `;
    }

    createTarefa(id, desc, pontos, status, cor) {
        // Apenas aplica a classe completed para os 100% (o CSS cuida da animação)
        const isCompleted = status === 100 ? "completed" : "";
        const textColor = status === 100 || status === 0 ? "text-white-final" : "";

        return `
            <div class="tarefa-row">
                <div class="col-num"><div class="tarefa-num">${id}</div></div>
                <div class="col-desc"><p class="tarefa-desc">${desc}</p></div>
                <div class="col-pontos"><p class="tarefa-pontos">${pontos}</p></div>
                <div class="col-status">
                    <div class="status-badge ${isCompleted} ${textColor}">
                        <div class="status-fill fill-${cor}" style="--target-width: ${status === 0 ? '100%' : status + '%'}"></div>
                        <span>${status}%</span>
                    </div>
                </div>
            </div>
        `;
    }
}

if (!customElements.get('painel-tarefas')) {
    customElements.define('painel-tarefas', PainelTarefas);
}