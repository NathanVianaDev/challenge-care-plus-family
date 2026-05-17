// Arquivo: PainelRanking.js

export class PainelRanking extends HTMLElement {
    connectedCallback() {
        const basePath = '/assets/Images/MiniAvatar/';
        
        // Captura o atributo para saber em qual tela o componente foi instanciado
        const tela = this.getAttribute('tela') || 'padrao';

        // 1. Configurações dinâmicas de acordo com a tela
        let linkVoltar = "../../Pages/Ranking/Ranking.html";
        let abaInicial = "individual";
        
        // Valores Padrão para a tela comum
        let nomePerfil = "Harry Potter";
        let subtextoPerfil = "32 anos &bull; Ilhabela";
        let labelFamiliaBox = "Família";
        let nomeFamiliaBox = "Potter";

        if (tela === 'familia') {
            linkVoltar = "../../Pages/AmbienteFamilia/AmbienteFamilia.html";
            abaInicial = "familiar";
            
            // Valores alterados exclusivamente para a tela Família
            nomePerfil = "Família Potter";
            subtextoPerfil = "Ilhabela"; // Idade removida
            
            // Retira a nomenclatura "Família" e altera o nome
            labelFamiliaBox = "Titular"; 
            nomeFamiliaBox = "Harry Potter";
        }

        // Estrutura HTML Base do Componente
        this.innerHTML = `
            <div class="ranking-container">
                
                <div class="d-flex align-items-center gap-3 mb-4">
                    <botao-voltar texto="Voltar" href="${linkVoltar}"></botao-voltar>
                    <h2 class="ranking-title m-0">Game Plus: Ranking</h2>
                </div>
                
                <div class="user-dashboard">
                    <div class="row g-4">
                        <div class="col-lg-5">
                            <div class="dashboard-card d-flex align-items-center h-100">
                                <img src="${basePath}avatar-cleuber.png" alt="Cleuber" class="profile-avatar" onerror="this.src='https://via.placeholder.com/75';">
                                <div class="ms-4">
                                    <h4 class="fw-bold mb-1 text-dark">${nomePerfil}</h4>
                                    <span class="badge bg-light text-secondary border mb-2">ID: 00.000.01</span>
                                    <p class="text-muted small mb-0 fw-medium">${subtextoPerfil}</p>
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
                                    <p class="stat-label">${labelFamiliaBox}</p>
                                    <h5 class="fw-bold text-dark mb-0">${nomeFamiliaBox}</h5>
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
                        <button class="btn-tab ${abaInicial === 'individual' ? 'active' : ''}" data-target="individual">Individual</button>
                        <button class="btn-tab ${abaInicial === 'familiar' ? 'active' : ''}" data-target="familiar">Familiar</button>
                        <button class="btn-tab ${abaInicial === 'empresarial' ? 'active' : ''}" data-target="empresarial">Empresarial</button>
                    </div>
                </div>

                <div class="leaderboard-area">
                    <div class="leaderboard-header">
                        <div class="col-posicao">Pos</div>
                        <div class="col-avatar">Avatar</div>
                        <div class="col-nome" id="titulo-coluna-nome">Nome do Colaborador</div>
                        <div class="col-pontos">Pontos</div>
                    </div>

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
                    { pos: 1, nome: "Alvo Severo Potter", pontos: "4500", avatar: "avatar-carlos.png" },
                    { pos: 2, nome: "Harry Potter", pontos: "4100", avatar: "avatar-cleuber.png" },
                    { pos: 3, nome: "Ginevra Molly Potter", pontos: "3800", avatar: "avatar-suzan.png" },
                    { pos: 4, nome: "Tiago Sirius Potter", pontos: "3200", avatar: "avatar-carlos.png" },
                    { pos: 5, nome: "Lilian Luna Potter", pontos: "2900", avatar: "avatar-ana.png" }
                ]
            },
            empresarial: {
                tituloColuna: "Nome da Empresa",
                lista: [
                    { pos: 1, nome: "Grifinória", pontos: "15500", avatar: "#" },
                    { pos: 2, nome: "Sonserina", pontos: "14800", avatar: "#" },
                    { pos: 3, nome: "Corvinal", pontos: "13900", avatar: "#" },
                    { pos: 4, nome: "Lufa-Lufa", pontos: "12500", avatar: "#" }
                ]
            }
        };

        this.basePath = basePath;
        this.configurarEventos();
        
        // Renderiza a aba inicial correta baseada na tela atual
        this.renderizarLista(abaInicial);
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