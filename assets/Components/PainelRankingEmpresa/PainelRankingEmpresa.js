export class PainelRankingEmpresa extends HTMLElement {
    connectedCallback() {
        const basePath = '/assets/Images/MiniAvatar/';
        let linkVoltar = "/assets/Pages/AmbienteEmpresa/AmbienteEmpresa.html";
        
        this.innerHTML = `
            <div class="ranking-container">
                <div class="d-flex align-items-center gap-3 mb-4">
                    <botao-voltar texto="Voltar" href="${linkVoltar}"></botao-voltar>
                    <div class="d-flex align-items-center gap-3 mb-4">
                        <h2 class="ranking-title m-0">Ranking Corporativo</h2>
                    </div>
                </div>
                
                <div class="user-dashboard">
                    <div class="row g-4">
                        <div class="col-lg-5">
                            <div class="dashboard-card d-flex align-items-center h-100">
                                <div class="profile-avatar-corp d-flex align-items-center justify-content-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" width="52" height="52" aria-label="Microsoft">
                                        <path fill="#f35325" d="M1 1h10v10H1z"/>
                                        <path fill="#81bc06" d="M12 1h10v10H12z"/>
                                        <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                                        <path fill="#ffba08" d="M12 12h10v10H12z"/>
                                    </svg>
                                </div>
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
                    {
                        pos: 1, nome: "Tecnologia / TI", pontos: "12500",
                        icone: '<div class="shadow-sm" style="width:45px;height:45px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#3aadde,#1a8db5)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h7v2H8v2h8v-2h-3v-2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z"/></svg></div>'
                    },
                    {
                        pos: 2, nome: "Recursos Humanos", pontos: "9800",
                        icone: '<div class="shadow-sm" style="width:45px;height:45px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#92C444,#6fa832)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg></div>'
                    },
                    {
                        pos: 3, nome: "Financeiro", pontos: "8500",
                        icone: '<div class="shadow-sm" style="width:45px;height:45px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,#3aadde,#1a8db5)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="white"><path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z"/></svg></div>'
                    }
                ]
            },
            parceiros: {
                tituloColuna: "Empresa Parceira",
                lista: [
                    {
                        pos: 1, nome: "Google Brasil", pontos: "52000",
                        icone: '<div class="shadow-sm" style="width:45px;height:45px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:white;border:1.5px solid #e9ecef"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg></div>'
                    },
                    {
                        pos: 2, nome: "Apple Inc.", pontos: "48500",
                        icone: '<div class="shadow-sm" style="width:45px;height:45px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:#1c1c1e"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg></div>'
                    },
                    {
                        pos: 3, nome: "Microsoft Brasil", pontos: "45000",
                        icone: '<div class="shadow-sm" style="width:45px;height:45px;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:white;border:1.5px solid #e9ecef"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" width="28" height="28"><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg></div>'
                    }
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

            const avatarHTML = item.icone
                ? item.icone
                : `<img src="${this.basePath}${item.avatar}" class="avatar-miniatura shadow-sm" onerror="this.src='/assets/Images/avatar-padrao.png';">`;

            const linhaHTML = `
                <div class="ranking-row">
                    <div class="col-posicao"><div class="medalha ${classeMedalha}">${item.pos}</div></div>
                    <div class="col-avatar">${avatarHTML}</div>
                    <div class="col-nome"><p class="nome-jogador">${item.nome}</p></div>
                    <div class="col-pontos"><p class="pontos-jogador">${item.pontos}</p></div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', linhaHTML);
        });
    }
}

customElements.define('painel-ranking-empresa', PainelRankingEmpresa);