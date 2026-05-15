/**
 * PainelRankingEmpresa - Care Plus Family
 * Componente de Ranking voltado para a visão do Gestor/Empresa.
 */

export class PainelRankingEmpresa extends HTMLElement {
    connectedCallback() {
        const basePath = '/assets/Images/MiniAvatar/';
        
        this.innerHTML = `
            <div class="ranking-container">
                
                <div class="d-flex align-items-center gap-3 mb-4">
                    <h2 class="ranking-title m-0">Corporate Ranking</h2>
                </div>
                
                <div class="user-dashboard">
                    <div class="row g-4">
                        <div class="col-lg-5">
                            <div class="dashboard-card d-flex align-items-center h-100">
                                <img src="/assets/Images/logo-microsoft.png" alt="Microsoft" class="profile-avatar-corp" onerror="this.src='https://via.placeholder.com/75';">
                                <div class="ms-4">
                                    <h4 class="fw-bold mb-1 text-dark">Microsoft Brasil</h4>
                                    <span class="badge bg-primary mb-2">Unidade Sede - SP</span>
                                    <p class="text-muted small mb-0 fw-medium">ID Corporativo: 12.345.678/0001-99</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3">
                            <div class="dashboard-card text-center h-100 d-flex flex-column justify-content-center">
                                <div>
                                    <p class="stat-label">Posição no Mercado</p>
                                    <h3 class="fw-bold text-care-blue mb-0">3º</h3>
                                </div>
                                <hr class="opacity-10 my-3">
                                <div>
                                    <p class="stat-label">Pontos Acumulados</p>
                                    <h4 class="fw-bold text-care-green mb-0">45.000 pts</h4>
                                </div>
                            </div>
                        <div class="col-lg-4">
                            <div class="dashboard-card h-100 d-flex flex-column justify-content-center">
                                <div class="mb-3">
                                    <p class="stat-label">Setor Líder</p>
                                    <h5 class="fw-bold text-dark mb-0">Tecnologia (TI)</h5>
                                </div>
                                <div>
                                    <p class="stat-label">Gestor Responsável</p>
                                    <h5 class="fw-bold text-dark mb-0">Pacheco Ferreira</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modern-tabs-wrapper">
                    <div class="ranking-tabs shadow-sm">
                        <button class="btn-tab active" data-target="colaboradores">Top Colaboradores</button>
                        <button class="btn-tab" data-target="setores">Por Setor</button>
                        <button class="btn-tab" data-target="parceiros">Ranking de Parceiros</button>
                    </div>
                </div>

                <div class="leaderboard-area">
                    <div class="leaderboard-header">
                        <div class="col-posicao">Pos</div>
                        <div class="col-avatar">Logo/Avatar</div>
                        <div class="col-nome" id="titulo-coluna-nome">Nome do Colaborador</div>
                        <div class="col-pontos">Pontos</div>
                    </div>

                    <div id="ranking-list-container"></div>
                </div>
            </div>
        `;

        this.dadosRanking = {
            colaboradores: {
                tituloColuna: "Nome do Colaborador",
                lista: [
                    { pos: 1, nome: "Harry Potter", pontos: "3000", avatar: "avatar-cleuber.png" },
                    { pos: 2, nome: "Hermione Granger", pontos: "2850", avatar: "avatar-ana.png" },
                    { pos: 3, nome: "Draco Malfoy", pontos: "2500", avatar: "avatar-carlos.png" }
                ]
            },
            setores: {
                tituloColuna: "Departamento",
                lista: [
                    { pos: 1, nome: "Tecnologia / TI", pontos: "12500", avatar: "avatar-padrao.png" },
                    { pos: 2, nome: "Recursos Humanos", pontos: "9800", avatar: "avatar-padrao.png" },
                    { pos: 3, nome: "Financeiro", pontos: "8500", avatar: "avatar-padrao.png" }
                ]
            },
            parceiros: {
                tituloColuna: "Empresa Parceira",
                lista: [
                    { pos: 1, nome: "Google Brasil", pontos: "52000", avatar: "avatar-padrao.png" },
                    { pos: 2, nome: "Apple Inc.", pontos: "48500", avatar: "avatar-padrao.png" },
                    { pos: 3, nome: "Microsoft Brasil", pontos: "45000", avatar: "avatar-padrao.png" }
                ]
            }
        };

        this.basePath = basePath;
        this.configurarEventos();
        this.renderizarLista('colaboradores');
    }

    configurarEventos() {
        const botoesAba = this.querySelectorAll('.btn-tab');
        botoesAba.forEach(botao => {
            botao.addEventListener('click', (e) => {
                botoesAba.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                const alvo = e.target.getAttribute('data-target');
                this.renderizarLista(alvo);
            });
        });
    }

    renderizarLista(categoria) {
        const container = this.querySelector('#ranking-list-container');
        const tituloColuna = this.querySelector('#titulo-coluna-nome');
        const dados = this.dadosRanking[categoria];

        tituloColuna.textContent = dados.tituloColuna;
        container.innerHTML = '';

        dados.lista.forEach(item => {
            let classeMedalha = 'medalha-padrao';
            if (item.pos === 1) classeMedalha = 'medalha-ouro';
            else if (item.pos === 2) classeMedalha = 'medalha-prata';
            else if (item.pos === 3) classeMedalha = 'medalha-bronze';

            const linhaHTML = `
                <div class="ranking-row">
                    <div class="col-posicao"><div class="medalha ${classeMedalha}">${item.pos}</div></div>
                    <div class="col-avatar">
                        <img src="${this.basePath}${item.avatar}" class="avatar-miniatura shadow-sm" onerror="this.src='https://via.placeholder.com/45';">
                    </div>
                    <div class="col-nome"><p class="nome-jogador">${item.nome}</p></div>
                    <div class="col-pontos"><p class="pontos-jogador">${item.pontos}</p></div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', linhaHTML);
        });
    }
}

customElements.define('painel-ranking-empresa', PainelRankingEmpresa);