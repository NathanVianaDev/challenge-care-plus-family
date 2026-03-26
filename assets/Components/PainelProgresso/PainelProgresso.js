class PainelProgresso extends HTMLElement {
    connectedCallback() {
        // 1. Renderiza o HTML do Componente
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
                <div class="col-12 mt-3">
                    <button class="btn btn-acao w-100 rounded-pill py-2 fw-bold text-white shadow-sm">
                        Troque seus pontos
                    </button>
                </div>
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
                <button class="btn btn-acao btn-lg rounded-pill fw-bold text-white shadow-sm">Tarefas +</button>
                <button class="btn btn-acao btn-lg rounded-pill fw-bold text-white shadow-sm">Ranking Global</button>
            </div>
        `;

        // 2. Executa as funções que ficavam no antigo ranking.js
        this.carregarUsuario();
        setTimeout(() => this.animarBarras(), 300); // Aguarda 300ms para a transição ficar bonita
    }

    animarBarras() {
        // Busca apenas as barras que estão dentro deste componente
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
        const usuarioLogado = { nome: "Pacheco" }; // Mude o nome aqui!
        
        // Busca o elemento na página global
        const elementoNome = document.getElementById('display-name');
        if (elementoNome) { 
            elementoNome.innerText = usuarioLogado.nome; 
        }
    }
}

customElements.define('painel-progresso', PainelProgresso);