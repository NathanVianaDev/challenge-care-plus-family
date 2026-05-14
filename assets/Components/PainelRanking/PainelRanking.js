export class PainelRanking extends HTMLElement {
    connectedCallback() {
        const basePath = '/assets/Images/MiniAvatar/';
        
        // Estrutura HTML Base do Componente
        this.innerHTML = `
            <div class="ranking-container">
                
                <!-- Título com Botão Voltar lado a lado -->
                <div class="d-flex align-items-center gap-3 mb-4">
                    <botao-voltar texto="Voltar" href="../../Pages/Ranking/Ranking.html"></botao-voltar>
                    <h2 class="ranking-title m-0">Game Plus: Ranking</h2>
                </div>
                
                <div class="user-dashboard">
                    <div class="row g-4">
                        <div class="col-lg-5">
                            <div class="dashboard-card d-flex align-items-center h-100">
                                <img src="${basePath}avatar-cleuber.png" alt="Cleuber" class="profile-avatar" onerror="this.src='https://via.placeholder.com/75';">
                                <div class="ms-4">
                                    <h4 class="fw-bold mb-1 text-dark">Harry Potter</h4>
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
                                    <h5 class="fw-bold text-dark mb-0">Potter</h5>
                                </div>
                                <div>
                                    <p class="stat-label">Empresa</p>
                                    <h5 class="fw-bold text-dark mb-0">Grifinória</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modern-tabs-wrapper">
                    <div class="ranking-tabs shadow-sm">
                        <button class="btn-tab active" data-target="individual">Individual</button>
                        <button class="btn-tab" data-target="familiar">Familiar</button>
                        <button class="btn-tab" data-target="empresarial">Empresarial</button>
                    </div>
                </div>

                <div class="leaderboard-area">
                    <div class="leaderboard-header">
                        <div class="col-posicao">Pos</div>
                        <div class="col-avatar">Avatar</div>
                        <div class="col-nome" id="titulo-coluna-nome">Nome do Colaborador</div>
                        <div class="col-pontos">Pontos</div>
                    </div>

                    <!-- Lista dinâmica de ranking será injetada aqui -->
                    <div id="ranking-list-container"></div>
                </div>
            </div>
        `;

        // Mock de Dados Organizado
        this.dadosRanking = {
            individual: {
                tituloColuna: "Nome do Colaborador",
                lista: [
                    { pos: 1, nome: "Harry Potter", pontos: "3000", avatar: "avatar-cleuber.png" },
                    { pos: 2, nome: "Hermione Jean Granger", pontos: "2850", avatar: "avatar-ana.png" },
                    { pos: 3, nome: "Bellatrix Lestrange", pontos: "2700", avatar: "avatar-suzan.png" },
                    { pos: 4, nome: "Draco Lucius Malfoy", pontos: "2500", avatar: "avatar-carlos.png" },
                    { pos: 5, nome: "Alvo Percival Wulfrico Brian Dumbledore ", pontos: "2400", avatar: "avatar-enzzo.png" }
                ]
            },
            familiar: {
                tituloColuna: "Nome do Membro",
                lista: [
                    { pos: 1, nome: "Alvo Severo Potter", pontos: "4500", avatar: "avatar-padrao.png" },
                    { pos: 2, nome: "Harry Potter", pontos: "4100", avatar: "avatar-padrao.png" },
                    { pos: 3, nome: "Ginevra Molly Potter", pontos: "3800", avatar: "avatar-padrao.png" },
                    { pos: 4, nome: "Tiago Sirius Potter", pontos: "3200", avatar: "avatar-padrao.png" },
                    { pos: 5, nome: "Lilian Luna Potter", pontos: "2900", avatar: "avatar-padrao.png" }
                ]
            },
            empresarial: {
                tituloColuna: "Nome da Empresa",
                lista: [
                    { pos: 1, nome: "Grifinória", pontos: "15500", avatar: "avatar-padrao.png" },
                    { pos: 2, nome: "Sonserina", pontos: "14800", avatar: "avatar-padrao.png" },
                    { pos: 3, nome: "Corvinal", pontos: "13900", avatar: "avatar-padrao.png" },
                    { pos: 4, nome: "Lufa-Lufa", pontos: "12500", avatar: "avatar-padrao.png" }
                ]
            }
        };

        this.basePath = basePath;
        this.configurarEventos();
        
        // Renderiza a primeira aba por padrão
        this.renderizarLista('individual');
    }

    configurarEventos() {
        const botoesAba = this.querySelectorAll('.btn-tab');
        
        botoesAba.forEach(botao => {
            botao.addEventListener('click', (e) => {
                // Remove classe active de todos
                botoesAba.forEach(b => b.classList.remove('active'));
                
                // Adiciona active no botão clicado
                e.target.classList.add('active');
                
                // Renderiza a lista correspondente
                const alvo = e.target.getAttribute('data-target');
                this.renderizarLista(alvo);
            });
        });
    }

    renderizarLista(categoria) {
        const container = this.querySelector('#ranking-list-container');
        const tituloColuna = this.querySelector('#titulo-coluna-nome');
        const dados = this.dadosRanking[categoria];

        // Atualiza o título da coluna
        tituloColuna.textContent = dados.tituloColuna;

        // Limpa a lista atual
        container.innerHTML = '';

        // Monta o novo HTML iterando sobre os dados
        dados.lista.forEach(item => {
            
            // Define a classe da medalha e cor do texto com base na posição
            let classeMedalha = 'medalha-padrao';
            let classeTextoPontos = 'text-secondary';
            
            if (item.pos === 1) { classeMedalha = 'medalha-ouro'; classeTextoPontos = ''; }
            else if (item.pos === 2) { classeMedalha = 'medalha-prata'; classeTextoPontos = ''; }
            else if (item.pos === 3) { classeMedalha = 'medalha-bronze'; classeTextoPontos = ''; }

            const linhaHTML = `
                <div class="ranking-row">
                    <div class="col-posicao"><div class="medalha ${classeMedalha}">${item.pos}</div></div>
                    <div class="col-avatar">
                        <img src="${this.basePath}${item.avatar}" class="avatar-miniatura shadow-sm" onerror="this.src='https://via.placeholder.com/45';">
                    </div>
                    <div class="col-nome"><p class="nome-jogador">${item.nome}</p></div>
                    <div class="col-pontos"><p class="pontos-jogador ${classeTextoPontos}">${item.pontos}</p></div>
                </div>
            `;
            
            container.insertAdjacentHTML('beforeend', linhaHTML);
        });
    }
}

if (!customElements.get('painel-ranking')) {
    customElements.define('painel-ranking', PainelRanking);
}