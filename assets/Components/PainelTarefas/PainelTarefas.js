export class PainelTarefas extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        const tela = this.getAttribute('tela') || 'padrao';

        let linkVoltar = "../../Pages/Ranking/Ranking.html";
        let tituloTarefas = "Tarefas gerais";
        let listaTarefasHtml = "";

      
        if (tela === 'familia') {
            linkVoltar = "../../Pages/AmbienteFamilia/AmbienteFamilia.html";
            tituloTarefas = "Tarefas da Família";

           
            listaTarefasHtml = `
                ${this.createTarefa(1, "Passos Coletivos: Alcançar 30.000 passos somados na casa no dia", 300, 50, "yellow")}
                ${this.createTarefa(2, "Hidratação da Casa: Consumir 9 Litros de água somados no dia", 200, 100, "green")}
                ${this.createTarefa(3, "Prevenção em Grupo: Agendar consulta de rotina anual para 3 membros", 400, 0, "red")}
                ${this.createTarefa(4, "Carteira em Dia: Atualizar registro de vacinação de 3 dependentes", 300, 100, "green")}
                ${this.createTarefa(5, "Esporte em Família: Praticar 1h de atividade física juntos na semana", 250, 25, "yellow")}
                ${this.createTarefa(6, "Cozinha Saudável: Preparar 3 refeições balanceadas em conjunto", 200, 100, "green")}
                ${this.createTarefa(7, "Detox Digital: Ficar 2h seguidas sem telas à noite (mínimo 3 pessoas)", 150, 0, "red")}
            `;
        } else {
            listaTarefasHtml = `
                ${this.createTarefa(1, "Dar 10.000 Passos por dia", 150, 75, "yellow")}
                ${this.createTarefa(2, "Beber 3 Litros de água", 100, 100, "green")}
                ${this.createTarefa(3, "Realizar 01 consulta no semestre", 200, 0, "red")}
                ${this.createTarefa(4, "Realizar 01 consulta psicológica", 200, 0, "red")}
                ${this.createTarefa(5, "Realizar 01 limpeza dentária", 200, 100, "green")}
                ${this.createTarefa(6, "Participar de 01 vídeo aula", 75, 100, "green")}
                ${this.createTarefa(7, "Acessar o site diariamente", 100, 100, "green")}
            `;
        }

        this.innerHTML = `
            <div class="tarefas-container">
    
                <div class="d-flex align-items-center gap-3 mb-4">
                    <botao-voltar texto="Voltar" href="${linkVoltar}"></botao-voltar>
                    <h2 class="tarefas-title m-0">${tituloTarefas}</h2>
                </div>
                
                <div class="tarefas-lista">
                    <div class="tarefas-header">
                        <div class="col-num">#</div>
                        <div class="col-desc">Descrição da Tarefa</div>
                        <div class="col-pontos">Pontos</div>
                        <div class="col-status">Status</div>
                    </div>
                    
                    ${listaTarefasHtml}
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

if (!customElements.get('painel-tarefas')) {
    customElements.define('painel-tarefas', PainelTarefas);
}