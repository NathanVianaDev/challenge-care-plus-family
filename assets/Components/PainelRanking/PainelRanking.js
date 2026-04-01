export class PainelRanking extends HTMLElement {
    connectedCallback() {
        // AJUSTADO: Apontando para a pasta Images (plural) e MiniAvatar
        const basePath = '/assets/Images/MiniAvatar/';
        
        this.innerHTML = `
            <div class="ranking-container">
                <h2 class="ranking-title">Game Plus: Ranking</h2>
                
                <div class="user-dashboard">
                    <div class="row g-4">
                        <div class="col-lg-5">
                            <div class="dashboard-card d-flex align-items-center h-100">
                                <img src="${basePath}avatar-cleuber.png" alt="Cleuber" class="profile-avatar" onerror="this.src='https://via.placeholder.com/75';">
                                <div class="ms-4">
                                    <h4 class="fw-bold mb-1 text-dark">Cleuber Pacheco</h4>
                                    <span class="badge bg-light text-secondary border mb-2">ID: 00.000.01</span>
                                    <p class="text-muted small mb-0 fw-medium">32 anos &bull; Ilhabela</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3">
                            <div class="dashboard-card text-center h-100 d-flex flex-column justify-content-center">
                                <div>
                                    <p class="stat-label">Sua Posição</p>
                                    <h3 class="fw-bold text-care-blue mb-0">1º</h3>
                                </div>
                                <hr class="opacity-10 my-3">
                                <div>
                                    <p class="stat-label">Pontuação</p>
                                    <h4 class="fw-bold text-care-green mb-0">3000 pts</h4>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="dashboard-card h-100 d-flex flex-column justify-content-center">
                                <div class="mb-3">
                                    <p class="stat-label">Família</p>
                                    <h5 class="fw-bold text-dark mb-0">Pacheco</h5>
                                </div>
                                <div>
                                    <p class="stat-label">Empresa</p>
                                    <h5 class="fw-bold text-dark mb-0">Microsoft</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modern-tabs-wrapper">
                    <div class="ranking-tabs shadow-sm">
                        <button class="btn-tab active">Individual</button>
                        <button class="btn-tab">Familiar</button>
                        <button class="btn-tab">Empresarial</button>
                    </div>
                </div>

                <div class="leaderboard-area">
                    <div class="leaderboard-header">
                        <div class="col-posicao">Pos</div>
                        <div class="col-avatar">Avatar</div>
                        <div class="col-nome">Nome do Colaborador</div>
                        <div class="col-pontos">Pontos</div>
                    </div>

                    <div class="ranking-row">
                        <div class="col-posicao"><div class="medalha medalha-ouro">1</div></div>
                        <div class="col-avatar"><img src="${basePath}avatar-cleuber.png" class="avatar-miniatura shadow-sm" onerror="this.src='https://via.placeholder.com/45';"></div>
                        <div class="col-nome"><p class="nome-jogador">Cleuber Pacheco Ferreira</p></div>
                        <div class="col-pontos"><p class="pontos-jogador">3000</p></div>
                    </div>

                    <div class="ranking-row">
                        <div class="col-posicao"><div class="medalha medalha-prata">2</div></div>
                        <div class="col-avatar"><img src="${basePath}avatar-ana.png" class="avatar-miniatura shadow-sm" onerror="this.src='https://via.placeholder.com/45';"></div>
                        <div class="col-nome"><p class="nome-jogador">Ana Clara Nunes</p></div>
                        <div class="col-pontos"><p class="pontos-jogador">2850</p></div>
                    </div>

                    <div class="ranking-row">
                        <div class="col-posicao"><div class="medalha medalha-bronze">3</div></div>
                        <div class="col-avatar"><img src="${basePath}avatar-suzan.png" class="avatar-miniatura shadow-sm" onerror="this.src='https://via.placeholder.com/45';"></div>
                        <div class="col-nome"><p class="nome-jogador">Suzan de Souza Costa</p></div>
                        <div class="col-pontos"><p class="pontos-jogador">2700</p></div>
                    </div>

                    <div class="ranking-row">
                        <div class="col-posicao"><div class="medalha medalha-padrao">4</div></div>
                        <div class="col-avatar"><img src="${basePath}avatar-carlos.png" class="avatar-miniatura shadow-sm" onerror="this.src='https://via.placeholder.com/45';"></div>
                        <div class="col-nome"><p class="nome-jogador">Carlos Almeida</p></div>
                        <div class="col-pontos"><p class="pontos-jogador text-secondary">2500</p></div>
                    </div>

                    <div class="ranking-row">
                        <div class="col-posicao"><div class="medalha medalha-padrao">5</div></div>
                        <div class="col-avatar"><img src="${basePath}avatar-enzzo.png" class="avatar-miniatura shadow-sm" onerror="this.src='https://via.placeholder.com/45';"></div>
                        <div class="col-nome"><p class="nome-jogador">Enzzo Lorenzzo Junior</p></div>
                        <div class="col-pontos"><p class="pontos-jogador text-secondary">2400</p></div>
                    </div>

                </div>
            </div>
        `;
    }
}

if (!customElements.get('painel-ranking')) {
    customElements.define('painel-ranking', PainelRanking);
}