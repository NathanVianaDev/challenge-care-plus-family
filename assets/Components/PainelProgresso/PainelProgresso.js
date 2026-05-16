class PainelProgresso extends HTMLElement {
    connectedCallback() {
        // Capturamos o atributo para saber em qual tela estamos
        const tela = this.getAttribute('tela') || 'padrao';

        let areaBotaoTroca = '';
        
        // 1. Definimos os links padrão (para a tela principal)
        let linkTarefas = '../PainelTarefas/PainelTarefas.html';
        let linkRanking = '../PainelRanking/PainelRanking.html';

        // Lógica condicional
        if (tela === 'padrao') {
            // Se for padrão, mostra o botão de troca de pontos
            areaBotaoTroca = `
                <div class="col-12 mt-3">
                    <a href="../TrocadePontos/TrocadePontos.html">
                        <button class="btn btn-acao w-100 rounded-pill py-2 fw-bold text-white shadow-sm">
                            Troque seus pontos
                        </button>
                    </a>
                </div>
            `;
        } else if (tela === 'familia') {
            // Se for família, esconde o botão de pontos e ALTERA OS LINKS!
            // ATENÇÃO: Altere os caminhos abaixo para o nome real das suas telas da família
            linkTarefas = '../PainelTarefasFamilia/PainelTarefasFamilia.html';
            linkRanking = '../PainelRankingFamilia/PainelRankingFamilia.html';
        }

        // 2. Renderiza o HTML do Componente injetando os links dinâmicos
        this.innerHTML = `
            <div class="row g-3 mb-4 text-center">
                <div class="col-6">
                    <label class="fw-bold small mb-2 d-block text-muted">Pontuação</label>
                    <div class="p-2 rounded-pill text-white fw-bold shadow-sm btn-acao">3000</div>
                </div>
                <div class="col-6">
                    <label class="fw-bold small mb-2 d-block text-muted">Ranking</label>
                    <div class="p-2 rounded-pill text-white fw-bold shadow-sm btn-acao">1º Lugar</div>
                </div>
                
                ${areaBotaoTroca}
                
            </div>

            <div class="mb-4">
                <label class="fw-bold small mb-2">Saúde</label>
                <div class="progress rounded-pill shadow-inset" style="height: 35px;">
                    <div class="progress-bar progress-gold fw-bold" data-target="75" style="width: 0%">0%</div>
                </div>
            </div>
            
            <div class="mb-4">
                <label class="fw-bold small mb-2">Odontologia</label>
                <div class="progress rounded-pill shadow-inset" style="height: 35px;">
                    <div class="progress-bar progress-gold fw-bold" data-target="50" style="width: 0%">0%</div>
                </div>
            </div>

            <div class="mb-5">
                <label class="fw-bold small mb-2">Estilo de Vida</label>
                <div class="progress rounded-pill shadow-inset" style="height: 35px;">
                    <div class="progress-bar progress-gold fw-bold" data-target="85" style="width: 0%">0%</div>
                </div>
            </div>

            <div class="d-grid gap-3 mt-4">
                <a href="${linkTarefas}"><button class="btn btn-acao btn-lg rounded-pill fw-bold text-white shadow-sm w-100">Tarefas +</button></a>
                <a href="${linkRanking}"><button class="btn btn-acao btn-lg rounded-pill fw-bold text-white shadow-sm w-100">Ranking Global</button></a>
            </div>
        `;

        // 3. Executa as funções
        this.carregarUsuario();
        setTimeout(() => this.animarBarras(), 300);
    }

    animarBarras() {
        const barras = this.querySelectorAll('.progress-bar');
        barras.forEach(barra => {
            const valorFinal = barra.getAttribute('data-target');
            if (valorFinal) {
                barra.style.width = valorFinal + '%';
                barra.innerText = valorFinal + '% Completo';
            }
        });
    }

    carregarUsuario() {
        const nomeRecebido = this.getAttribute('nome-usuario') || "Usuário";
        const elementoNome = document.getElementById('display-name');
        if (elementoNome) {
            elementoNome.innerText = nomeRecebido;
        }
    }
}

customElements.define('painel-progresso', PainelProgresso);