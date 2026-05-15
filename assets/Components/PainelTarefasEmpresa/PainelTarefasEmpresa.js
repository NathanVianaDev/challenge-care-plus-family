/**
 * PainelTarefasEmpresa - Care Plus Family
 * Componente voltado para metas e objetivos corporativos da empresa parceira.
 */

class PainelTarefasEmpresa extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="tarefas-container">
                <!-- Removido o botão voltar, mantendo apenas o título -->
                <div class="d-flex align-items-center mb-4">
                    <h2 class="tarefas-title m-0">Metas Corporativas</h2>
                </div>
                
                <div class="tarefas-lista">
                    <div class="tarefas-header">
                        <div class="col-num">#</div>
                        <div class="col-desc">Descrição da Meta</div>
                        <div class="col-pontos">Pontos</div>
                        <div class="col-status">Status</div>
                    </div>
                    
                    ${this.createTarefa(1, "Workshop de Soft Skills", 150, 100, "green")}
                    ${this.createTarefa(2, "Treinamento: Diversidade e Inclusão", 100, 75, "yellow")}
                    ${this.createTarefa(3, "Engajamento Semanal Care Plus", 200, 40, "red")}
                    ${this.createTarefa(4, "Check-up Semestral da Equipe", 200, 100, "green")}
                    ${this.createTarefa(5, "Feedback 360º - Ciclo Q2", 200, 10, "red")}
                    ${this.createTarefa(6, "Implementação de Pausa Ativa", 75, 100, "green")}
                    ${this.createTarefa(7, "Acesso ao Portal do Gestor", 100, 100, "green")}
                </div>
            </div>
        `;
    }

    createTarefa(id, desc, pontos, status, cor) {
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

if (!customElements.get('painel-tarefas-empresa')) {
    customElements.define('painel-tarefas-empresa', PainelTarefasEmpresa);
}