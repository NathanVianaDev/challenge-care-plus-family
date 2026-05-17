class PainelProgressoEmpresa extends HTMLElement {
    connectedCallback() {
        this.render();
        setTimeout(() => this.animarBarras(), 300);
    }

    render() {
        this.innerHTML = `
            <div class="row g-3 mb-4 text-center">
                <div class="col-6">
                    <label class="fw-bold small mb-2 d-block text-muted">Pontos da Unidade</label>
                    <div class="p-2 rounded-pill text-white fw-bold shadow-sm btn-acao-corp">45.000</div>
                </div>
                <div class="col-6">
                    <label class="fw-bold small mb-2 d-block text-muted">Posição Global</label>
                    <div class="p-2 rounded-pill text-white fw-bold shadow-sm btn-acao-corp">3º Lugar</div>
                </div>
            </div>

            <div class="mb-4">
                <label class="fw-bold small mb-2">Adesão aos Treinamentos</label>
                <div class="progress rounded-pill shadow-inset-corp" style="height: 35px;">
                    <div class="progress-bar progress-gold-corp fw-bold" data-target="92" style="width: 0%">0%</div>
                </div>
            </div>
            
            <div class="mb-4">
                <label class="fw-bold small mb-2">Utilização de Benefícios</label>
                <div class="progress rounded-pill shadow-inset-corp" style="height: 35px;">
                    <div class="progress-bar progress-gold-corp fw-bold" data-target="65" style="width: 0%">0%</div>
                </div>
            </div>

            <div class="mb-5">
                <label class="fw-bold small mb-2">Índice de Saúde (Equipe)</label>
                <div class="progress rounded-pill shadow-inset-corp" style="height: 35px;">
                    <div class="progress-bar progress-gold-corp fw-bold" data-target="80" style="width: 0%">0%</div>
                </div>
            </div>

            <div class="d-grid gap-3 mt-4">
                <a href="../PainelTarefasEmpresa/TarefasEmpresa.html" class="text-decoration-none">
                    <button class="btn btn-acao-corp btn-lg rounded-pill fw-bold text-white shadow-sm w-100">Metas Corporativas +</button>
                </a>
                <a href="../RankingEmpresa/RankingEmpresa.html" class="text-decoration-none">
                    <button class="btn btn-acao-corp btn-lg rounded-pill fw-bold text-white shadow-sm w-100">Ranking de Parceiros</button>
                </a>
            </div>
        `;
    }

    animarBarras() {
        const barras = this.querySelectorAll('.progress-bar');
        barras.forEach(barra => {
            const valorFinal = barra.getAttribute('data-target');
            if (valorFinal) {
                barra.style.width = valorFinal + '%';
                barra.innerText = valorFinal + '% de Engajamento';
            }
        });
    }
}

if (!customElements.get('painel-progresso-empresa')) {
    customElements.define('painel-progresso-empresa', PainelProgressoEmpresa);
}