export class PainelTroca extends HTMLElement {
    connectedCallback() {
        this.pontuacaoAtual = 3000;
        this.basePath = '/assets/Images/TrocadePontos/';
        
        this.render();
        this.initEventos();
    }

    render() {
        this.innerHTML = `
            <div class="troca-container">
                <div class="row">
                    <div class="col-lg-8 order-2 order-lg-1">
                    <div class="d-flex align-items-center mt-3 mt-md-0 gap-4">
                    <botao-voltar texto="Voltar" href="../../Pages/Ranking/Ranking.html"></botao-voltar>
                        <h2 class="troca-title">Troque seus pontos</h2>
                    </div>
                        <div class="rewards-list">
                            ${this.createReward('Gift Card', 'Ganhe um gift card de R$10 para<br>usar nas lojas parceiras.', 500)}
                            ${this.createReward('Gift Card', 'Ganhe um gift card de R$50 para<br>usar nas lojas parceiras.', 2500)}
                            ${this.createReward('Gift Card VIP', 'Ganhe um gift card de R$100 para<br>usar nas lojas parceiras.', 5000)}
                        </div>
                    </div>

                    <div class="col-lg-4 order-1 order-lg-2">
                        <div class="user-profile-panel">
                            <img src="${this.basePath}Foto-TrocaPontos.png" alt="Avatar" class="profile-img-large" onerror="this.src='https://via.placeholder.com/220x300';">
                            <div class="profile-stat-group">
                                <div class="stat-title">Pontuação</div>
                                <div class="stat-pill display-pontos">${this.pontuacaoAtual}</div>
                            </div>
                            <div class="profile-stat-group">
                                <div class="stat-title">Ranking</div>
                                <div class="stat-pill" style="background-color: #3aadde;">1º Lugar</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="modalTroca" class="modal-overlay hidden">
                <div class="custom-modal">
                    <img src="/assets/Images/logo-care-plus.png" alt="Care Plus" class="modal-logo" onerror="this.style.display='none';">
                    <h3 id="modalTitulo" class="modal-title">Título</h3>
                    <p id="modalMensagem" class="modal-message">Mensagem</p>
                    <button id="btnFecharModal" class="btn-modal">Entendi</button>
                </div>
            </div>
        `;
    }

    createReward(titulo, desc, custo) {
        return `
            <div class="reward-card">
                <div class="reward-img-box">
                    <img src="${this.basePath}GiftCard-TrocaPontos.png" alt="Gift Card" class="reward-img" onerror="this.src='https://via.placeholder.com/150x100';">
                </div>
                <div class="reward-info">
                    <h3 class="reward-title">${titulo}</h3>
                    <p class="reward-desc">${desc}</p>
                </div>
                <div class="reward-action">
                    <div class="pts-custo">${custo} pts</div>
                    <button class="btn-trocar" data-custo="${custo}">Trocar</button>
                </div>
            </div>
        `;
    }

    initEventos() {
        const botoesTrocar = this.querySelectorAll('.btn-trocar');
        const displayPontos = this.querySelector('.display-pontos');
        
        const modal = this.querySelector('#modalTroca');
        const btnFecharModal = this.querySelector('#btnFecharModal');

        btnFecharModal.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        botoesTrocar.forEach(botao => {
            botao.addEventListener('click', () => {
                const custo = parseInt(botao.getAttribute('data-custo'));

                if (this.pontuacaoAtual >= custo) {
                    const saldoAntigo = this.pontuacaoAtual;
                    this.pontuacaoAtual -= custo; 
                    
                    this.animarNumeros(displayPontos, saldoAntigo, this.pontuacaoAtual);

                    setTimeout(() => {
                        this.abrirModal(
                            'Resgate Realizado!', 
                            `Você utilizou <b>${custo} pontos</b> com sucesso.<br>Seu novo saldo é de <b>${this.pontuacaoAtual} pontos</b>.`,
                            false
                        );
                    }, 300);

                } else {
                    const faltam = custo - this.pontuacaoAtual;
                    this.abrirModal(
                        'Saldo Insuficiente', 
                        `Você tem <b>${this.pontuacaoAtual} pontos</b>, mas precisa de <b>${custo}</b>.<br>Faltam <b>${faltam} pontos</b> para este resgate.`,
                        true
                    );
                }
            });
        });
    }

    abrirModal(titulo, mensagem, isErro) {
        const modal = this.querySelector('#modalTroca');
        const modalTitulo = this.querySelector('#modalTitulo');
        const modalMensagem = this.querySelector('#modalMensagem');
        const btnFecharModal = this.querySelector('#btnFecharModal');

        modalTitulo.innerText = titulo;
        modalMensagem.innerHTML = mensagem;
        if (isErro) {
            btnFecharModal.classList.add('btn-erro');
            modalTitulo.style.color = '#ff6b6b';
        } else {
            btnFecharModal.classList.remove('btn-erro');
            modalTitulo.style.color = '#3aadde';
        }

        modal.classList.remove('hidden');
    }

    animarNumeros(elemento, valorInicial, valorFinal) {
        let valorAtual = valorInicial;
        const passo = Math.ceil((valorInicial - valorFinal) / 15); 
        
        const timer = setInterval(() => {
            valorAtual -= passo;
            if (valorAtual <= valorFinal) {
                valorAtual = valorFinal;
                clearInterval(timer);
                elemento.style.transform = 'scale(1.1)';
                setTimeout(() => elemento.style.transform = 'scale(1)', 150);
            }
            elemento.innerText = valorAtual;
        }, 30);
    }
}

if (!customElements.get('painel-troca')) {
    customElements.define('painel-troca', PainelTroca);
}