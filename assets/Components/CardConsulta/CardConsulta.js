// Arquivo: CardConsulta.js

export class CardConsulta extends HTMLElement {
    connectedCallback() {
        let dia = this.getAttribute('dia') || '00';
        let mes = this.getAttribute('mes') || 'MÊS';
        const especialidade = this.getAttribute('especialidade') || 'Especialidade';
        const profissional = this.getAttribute('profissional') || 'Nome do Profissional';
        let horario = this.getAttribute('horario') || '00:00';
        
        const modo = this.getAttribute('modo') || 'padrao'; 
        const statusAtual = this.getAttribute('status') || 'aguardando'; 
        
        let isConfirmado = statusAtual === 'confirmado'; 
        const idUnico = Math.random().toString(36).substr(2, 9);

        const imgAzul = new URL('../../Images/FundoConsulta/consulta-azul.png', import.meta.url).href;
        const imgVerde = new URL('../../Images/FundoConsulta/consulta-verde.png', import.meta.url).href;
        const caminhoConsultaCSS = new URL('./CardConsulta.css', import.meta.url).href;

        let bgImagem = imgAzul; 
        let corPrincipal = '#3aadde';     
        let bgData = '#f0f8ff'; 

        const espMinuscula = especialidade.toLowerCase();
        if (espMinuscula.includes('derma') || espMinuscula.includes('odonto') || espMinuscula.includes('nutri') || espMinuscula.includes('psico')) {
            bgImagem = imgVerde;
            corPrincipal = '#8cc63f';     
            bgData = '#f4faeb'; 
        } 

        let textoStatus = isConfirmado ? 'Confirmado' : 'Aguardando confirmação';
        let classeStatus = isConfirmado ? 'novo-badge-status confirmado' : 'novo-badge-status';

        const gerarOpcoesRemarcacao = (diaAtual, mesAtual) => {
            const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
            const indexMesAtual = meses.indexOf(mesAtual);
            
            const opcoes = [
                { dia: String((parseInt(diaAtual) + 2) % 28 || 28).padStart(2, '0'), mes: meses[(indexMesAtual + (parseInt(diaAtual) + 2 > 28 ? 1 : 0)) % 12], hora: '10:00' },
                { dia: String((parseInt(diaAtual) + 5) % 28 || 28).padStart(2, '0'), mes: meses[(indexMesAtual + (parseInt(diaAtual) + 5 > 28 ? 1 : 0)) % 12], hora: '15:30' },
                { dia: String((parseInt(diaAtual) + 7) % 28 || 28).padStart(2, '0'), mes: meses[(indexMesAtual + (parseInt(diaAtual) + 7 > 28 ? 1 : 0)) % 12], hora: '08:45' }
            ];
            return opcoes;
        };

        const opcoesData = gerarOpcoesRemarcacao(dia, mes);

        let areaBotoes = '';
        let areaModais = '';

        if (modo === 'padrao') {
            areaBotoes = `
                <button class="novo-btn-confirmar ${isConfirmado ? 'confirmado' : ''}" title="Confirmar Consulta">
                    <i class="bi bi-check-lg"></i>
                </button>
            `;
            
            areaModais = `
                <div class="modal fade" id="modal-${idUnico}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content border-0 shadow">
                            <div class="modal-header border-0 pb-0">
                                <h5 class="modal-title fw-bold" style="color: #3aadde;">Confirmar Agendamento</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body text-muted">
                                <h4>Deseja confirmar sua consulta de <strong>${especialidade}</strong> com <strong>${profissional}</strong>?</h4><br><br>
                                <h6 class="text-danger fw-bold"><i class="bi bi-exclamation-triangle-fill"></i> Atenção: Após confirmada, não será desmarcada por aqui.</h6>
                            </div>
                            <div class="modal-footer border-0 pt-0">
                                <button type="button" class="btn btn-light rounded-pill px-4" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-success rounded-pill px-4 btn-confirmar-modal">Sim, Confirmar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (modo === 'edicao') {
            areaBotoes = `
                <div class="caixa-botoes-edicao d-flex flex-column gap-2">
                    <button class="btn btn-success rounded-pill px-4 fw-bold shadow-sm btn-remarcar w-100">Remarcar</button>
                    <button class="btn btn-danger rounded-pill px-4 fw-bold shadow-sm btn-cancelar w-100">Cancelar</button>
                </div>
            `;

            areaModais = `
                <div class="modal fade" id="modal-cancelar-${idUnico}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content" style="border-radius: 16px; border: none;">
                            <div class="modal-header border-0 pb-0">
                                <h5 class="modal-title fw-bold">Motivo do Cancelamento</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p class="text-muted small">Por favor, informe o motivo para cancelar esta consulta de <strong>${especialidade}</strong>.</p>
                                <textarea id="texto-motivo-${idUnico}" class="form-control" rows="3" placeholder="Ex: Imprevisto no trabalho..."></textarea>
                            </div>
                            <div class="modal-footer border-0 pt-0">
                                <button type="button" class="btn btn-light rounded-pill px-4 w-100 mb-2" data-bs-dismiss="modal">Voltar</button>
                                <button type="button" class="btn btn-danger rounded-pill px-4 w-100 m-0 btn-confirmar-cancelamento">Confirmar Cancelamento</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="modal-remarcar-${idUnico}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content" style="border-radius: 16px; border: none;">
                            <div class="modal-header border-0 pb-0">
                                <h5 class="modal-title fw-bold" style="color: #198754;">Remarcar Consulta</h5>
                                <button type="button" class="btn-close btn-close-remarcar" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body tela-escolha-data">
                                <p class="text-muted mb-3">Selecione uma nova data e horário para <strong>${especialidade}</strong>:</p>
                                <div class="list-group gap-2">
                                    <button class="list-group-item list-group-item-action d-flex justify-content-between align-items-center rounded-3 border btn-opcao-data" 
                                            data-dia="${opcoesData[0].dia}" data-mes="${opcoesData[0].mes}" data-hora="${opcoesData[0].hora}">
                                        <span><i class="bi bi-calendar-event me-2"></i> ${opcoesData[0].dia} de ${opcoesData[0].mes}</span>
                                        <span class="badge bg-success rounded-pill px-3 py-2">${opcoesData[0].hora}</span>
                                    </button>
                                    <button class="list-group-item list-group-item-action d-flex justify-content-between align-items-center rounded-3 border btn-opcao-data" 
                                            data-dia="${opcoesData[1].dia}" data-mes="${opcoesData[1].mes}" data-hora="${opcoesData[1].hora}">
                                        <span><i class="bi bi-calendar-event me-2"></i> ${opcoesData[1].dia} de ${opcoesData[1].mes}</span>
                                        <span class="badge bg-success rounded-pill px-3 py-2">${opcoesData[1].hora}</span>
                                    </button>
                                    <button class="list-group-item list-group-item-action d-flex justify-content-between align-items-center rounded-3 border btn-opcao-data" 
                                            data-dia="${opcoesData[2].dia}" data-mes="${opcoesData[2].mes}" data-hora="${opcoesData[2].hora}">
                                        <span><i class="bi bi-calendar-event me-2"></i> ${opcoesData[2].dia} de ${opcoesData[2].mes}</span>
                                        <span class="badge bg-success rounded-pill px-3 py-2">${opcoesData[2].hora}</span>
                                    </button>
                                </div>
                            </div>
                            <div class="modal-footer border-0 pt-0 footer-escolha-data">
                                <button type="button" class="btn btn-light rounded-pill px-4 w-100" data-bs-dismiss="modal">Cancelar Remarcação</button>
                            </div>

                            <div class="modal-body tela-sucesso-remarcacao text-center" style="display: none; padding: 40px 20px;">
                                <i class="bi bi-check-circle-fill text-success" style="font-size: 60px;"></i>
                                <h4 class="fw-bold mt-3 text-success">Consulta Remarcada!</h4>
                                <p class="text-muted mb-4">Seu novo horário foi confirmado com sucesso.</p>
                                <button type="button" class="btn btn-success rounded-pill px-5 w-100 btn-fechar-sucesso" data-bs-dismiss="modal">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // --- MÁGICA DA VARIÁVEL CSS AQUI (--bg-mobile) ---
        this.innerHTML = `
            <link rel="stylesheet" href="${caminhoConsultaCSS}">
            
            <div class="card-novo-wrapper" id="caixa-card-${idUnico}" 
                style="background-image: url('${bgImagem}'); border-left-color: ${corPrincipal}; --bg-mobile: ${bgData};">
                <div class="card-novo-content">
                    
                    <div class="novo-bloco-principal">
                        <div class="novo-badge-data" style="background-color: ${bgData};">
                            <span class="novo-dia" id="txt-dia-${idUnico}" style="color: ${corPrincipal};">${dia}</span>
                            <span class="novo-mes" id="txt-mes-${idUnico}">${mes}</span>
                        </div>
                        
                        <div class="novo-info-textos">
                            <h5 class="novo-titulo" style="color: ${corPrincipal};">${especialidade}</h5>
                            <p class="novo-medico"><i class="bi bi-person-fill"></i> ${profissional}</p>
                        </div>
                    </div>

                    <div class="novo-bloco-acoes">
                        <div class="novo-status-box">
                            <span class="novo-horario" id="txt-hora-${idUnico}">${horario}</span>
                            <span class="${classeStatus}" id="badge-status-${idUnico}">${textoStatus}</span>
                        </div>
                        
                        <div class="novo-area-botoes">
                            ${areaBotoes}
                        </div>
                    </div>

                </div>
            </div>

            ${areaModais}
        `;

        if (modo === 'padrao') {
            const botaoCard = this.querySelector('.novo-btn-confirmar');
            const badgeStatus = this.querySelector(`#badge-status-${idUnico}`);
            const modalElement = this.querySelector(`#modal-${idUnico}`);
            const btnConfirmarModal = this.querySelector('.btn-confirmar-modal');
            const modalBootstrap = new bootstrap.Modal(modalElement);

            botaoCard.addEventListener('click', () => { if (!isConfirmado) modalBootstrap.show(); });

            btnConfirmarModal.addEventListener('click', () => {
                isConfirmado = true;
                badgeStatus.textContent = 'Confirmado';
                badgeStatus.classList.add('confirmado');
                botaoCard.classList.add('confirmado');
                botaoCard.title = 'Consulta Confirmada';
                modalBootstrap.hide();
            });
        } else if (modo === 'edicao') {
            const btnCancelar = this.querySelector('.btn-cancelar');
            const modalCancelamentoEl = this.querySelector(`#modal-cancelar-${idUnico}`);
            const btnConfirmarCancelamento = this.querySelector('.btn-confirmar-cancelamento');
            const modalCancelamentoBs = new bootstrap.Modal(modalCancelamentoEl);
            const cardInteiro = this.querySelector(`#caixa-card-${idUnico}`);

            const btnRemarcar = this.querySelector('.btn-remarcar');
            const modalRemarcarEl = this.querySelector(`#modal-remarcar-${idUnico}`);
            const modalRemarcarBs = new bootstrap.Modal(modalRemarcarEl);
            const botoesOpcaoData = this.querySelectorAll('.btn-opcao-data');
            
            const telaEscolha = this.querySelector('.tela-escolha-data');
            const footerEscolha = this.querySelector('.footer-escolha-data');
            const telaSucesso = this.querySelector('.tela-sucesso-remarcacao');
            const btnFecharSucesso = this.querySelector('.btn-fechar-sucesso');
            const btnXFechar = this.querySelector('.btn-close-remarcar');

            const txtDia = this.querySelector(`#txt-dia-${idUnico}`);
            const txtMes = this.querySelector(`#txt-mes-${idUnico}`);
            const txtHora = this.querySelector(`#txt-hora-${idUnico}`);
            const badgeStatus = this.querySelector(`#badge-status-${idUnico}`);

            btnCancelar.addEventListener('click', () => { modalCancelamentoBs.show(); });

            btnConfirmarCancelamento.addEventListener('click', () => {
                modalCancelamentoBs.hide();
                cardInteiro.style.opacity = '0';
                cardInteiro.style.transition = 'opacity 0.3s ease';
                setTimeout(() => { cardInteiro.style.display = 'none'; }, 300);
            });

            btnRemarcar.addEventListener('click', () => {
                telaEscolha.style.display = 'block';
                footerEscolha.style.display = 'block';
                telaSucesso.style.display = 'none';
                modalRemarcarBs.show();
            });

            botoesOpcaoData.forEach(botao => {
                botao.addEventListener('click', (e) => {
                    const btnClicado = e.currentTarget;
                    telaEscolha.style.display = 'none';
                    footerEscolha.style.display = 'none';
                    telaSucesso.style.display = 'block';

                    txtDia.textContent = btnClicado.getAttribute('data-dia');
                    txtMes.textContent = btnClicado.getAttribute('data-mes');
                    txtHora.textContent = btnClicado.getAttribute('data-hora');
                    
                    badgeStatus.textContent = 'Confirmado';
                    badgeStatus.classList.add('confirmado');
                    isConfirmado = true;
                });
            });

            btnFecharSucesso.addEventListener('click', () => { modalRemarcarBs.hide(); });
            btnXFechar.addEventListener('click', () => { modalRemarcarBs.hide(); });
        }
    }
}

customElements.define('card-consulta', CardConsulta);