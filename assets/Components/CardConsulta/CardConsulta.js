// Arquivo: CardConsulta.js

export class CardConsulta extends HTMLElement {
    connectedCallback() {
        // --- 1. CAPTURANDO OS DADOS ---
        let dia = this.getAttribute('dia') || '00';
        let mes = this.getAttribute('mes') || 'MÊS';
        const especialidade = this.getAttribute('especialidade') || 'Especialidade';
        const profissional = this.getAttribute('profissional') || 'Nome do Profissional';
        let horario = this.getAttribute('horario') || '00:00';

        const endereco = this.getAttribute('endereco') || 'Endereço não informado';
        const contato = this.getAttribute('contato') || 'Contato não informado';

        const modo = this.getAttribute('modo') || 'padrao';
        const statusAtual = this.getAttribute('status') || 'aguardando';

        let isConfirmado = statusAtual === 'confirmado';
        const idUnico = Math.random().toString(36).substr(2, 9);

        // --- 2. LÓGICA DAS CORES E IMAGENS ---
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

            return [
                { dia: String((parseInt(diaAtual) + 2) % 28 || 28).padStart(2, '0'), mes: meses[(indexMesAtual + (parseInt(diaAtual) + 2 > 28 ? 1 : 0)) % 12], hora: '10:00' },
                { dia: String((parseInt(diaAtual) + 5) % 28 || 28).padStart(2, '0'), mes: meses[(indexMesAtual + (parseInt(diaAtual) + 5 > 28 ? 1 : 0)) % 12], hora: '15:30' },
                { dia: String((parseInt(diaAtual) + 7) % 28 || 28).padStart(2, '0'), mes: meses[(indexMesAtual + (parseInt(diaAtual) + 7 > 28 ? 1 : 0)) % 12], hora: '08:45' }
            ];
        };
        const opcoesData = gerarOpcoesRemarcacao(dia, mes);

        // --- 3. CONSTRUINDO OS BLOCOS DINAMICAMENTE ---
        let areaBotoes = '';
        let areaModais = '';
        let painelExpansivel = '';
        let iconeSeta = '';

        let classeComSeta = modo === 'detalhes' ? 'com-seta' : '';

        if (modo === 'padrao' || modo === 'detalhes') {
            areaBotoes = `
                <button class="novo-btn-confirmar ${isConfirmado ? 'confirmado' : ''}" title="Confirmar Consulta">
                    <i class="bi bi-check-lg"></i>
                </button>
            `;

            // Modal restaurado com a imagem e textos maiores, mas respeitando o espaçamento!
            areaModais = `
                <div class="modal fade" id="modal-${idUnico}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content border-0 shadow">
                            
                            <img src="/assets/Images/logo-care-plus.png" alt="Care Plus" class="modal-logo mx-auto mt-4" style="width: 10rem;">
                            
                            <div class="border-0 pb-0">
                                <h5 class="modal-title fw-bold text-center" style="color: #3aadde;">Confirmar Agendamento</h5>
                            </div>
                            
                            <div class="modal-body text-muted text-center">
                                <p class="fs-5 mb-4">Deseja confirmar sua consulta de <strong>${especialidade}</strong> com <strong>${profissional}</strong>?</p>
                                
                                <p class="text-danger fw-bold mb-0" style="font-size: 1.05rem;">
                                    <i class="bi bi-exclamation-triangle-fill"></i> Atenção: Após confirmada, não será possível desmarcar por aqui.
                                </p>
                            </div>
                            
                            <div class="modal-footer border-0 pt-0 mt-2">
                                <button type="button" class="btn btn-light rounded-pill px-4" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" class="btn btn-success rounded-pill px-4 btn-confirmar-modal">Sim, Confirmar</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            `;

            if (modo === 'detalhes') {
                iconeSeta = `
                    <div class="indicador-expansao aberto" id="indicador-${idUnico}" style="color: ${corPrincipal};">
                        <i class="bi bi-chevron-down icone-seta"></i>
                    </div>
                `;

                painelExpansivel = `
                    <div class="painel-expansivel aberto" id="painel-${idUnico}">
                        <div class="divisor-painel" style="background-color: ${corPrincipal}40;"></div>
                        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                            <div class="infos-clinica text-muted small">
                                <h6 class="mb-1"><i class="bi bi-geo-alt-fill" style="color: ${corPrincipal};"></i> <strong class="text-dark">Endereço:</strong> ${endereco}</h6>
                                <h6 class="mb-1"><i class="bi bi-telephone-fill" style="color: ${corPrincipal};"></i> <strong class="text-dark">Contato:</strong> ${contato}</h6>
                            </div>
                            <div class="d-flex gap-2 botoes-extras">
                                <button class="btn btn-sm btn-outline-marca-azul rounded-pill px-3 fw-bold btn-acao-extra btn-rotas"><i class="bi bi-sign-turn-right-fill me-1"></i> Rotas</button>
                                <button class="btn btn-sm btn-outline-marca-verde rounded-pill px-3 fw-bold btn-acao-extra btn-clima"><i class="bi bi-cloud-sun-fill me-1"></i> Clima</button>
                            </div>
                        </div>
                    </div>
                `;
                
                areaModais += `
                    <div class="modal fade" id="modal-aviso-${idUnico}" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-sm">
                            <div class="modal-content text-center shadow" style="border-radius: 20px; border: none; padding: 20px;">
                                <div class="modal-body p-1">
                                    <div id="aviso-icone-${idUnico}" class="mb-2" style="font-size: 50px;"></div>
                                    <h5 class="fw-bold mb-3" id="aviso-titulo-${idUnico}" style="color: ${corPrincipal};">Título</h5>
                                    <p class="text-muted small mb-4" id="aviso-texto-${idUnico}">Texto</p>
                                    <button type="button" class="btn btn-light rounded-pill px-4 w-100 fw-bold" data-bs-dismiss="modal" style="color: ${corPrincipal}; background-color: ${bgData};">Entendi</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        } else if (modo === 'edicao') {
            areaBotoes = `
                <div class="caixa-botoes-edicao d-flex flex-column gap-2">
                <button class="btn btn-success rounded-pill px-4 fw-bold shadow-sm btn-remarcar w-100" style="background-color: #8CC63F; border: none;">Remarcar</button>
                <button class="btn btn-danger rounded-pill px-4 fw-bold shadow-sm btn-cancelar w-100" style="background-color: #ff5c5c; border: none;">Cancelar</button>
                </div>
            `;
            
            areaModais = `
                <div class="modal fade" id="modal-cancelar-${idUnico}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content" style="border-radius: 16px; border: none;">
                            <div class="modal-header border-0 pb-0">
                                <h5 class="modal-title fw-bold">Motivo do Cancelamento</h5>
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

        // --- 4. INJETANDO O HTML DO COMPONENTE ---
        this.innerHTML = `
            <link rel="stylesheet" href="${caminhoConsultaCSS}">
            
            <div class="card-novo-wrapper" id="caixa-card-${idUnico}" style="border-left-color: ${corPrincipal}; background-color: #ffffff;">
                
                <div class="card-novo-content topo-card-bg ${classeComSeta}" style="background-image: url('${bgImagem}'); --bg-mobile: ${bgData};">
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
                    
                    ${iconeSeta}
                </div>

                ${painelExpansivel}

            </div>

            ${areaModais}
        `;

        // --- 5. INTERATIVIDADE ---
        if (modo === 'padrao' || modo === 'detalhes') {
            const botaoCard = this.querySelector('.novo-btn-confirmar');
            const badgeStatus = this.querySelector(`#badge-status-${idUnico}`);
            const modalElement = this.querySelector(`#modal-${idUnico}`);
            const btnConfirmarModal = this.querySelector('.btn-confirmar-modal');
            const modalBootstrap = new bootstrap.Modal(modalElement);

            botaoCard.addEventListener('click', (e) => {
                if (!isConfirmado) modalBootstrap.show();
            });

            btnConfirmarModal.addEventListener('click', () => {
                isConfirmado = true;
                badgeStatus.textContent = 'Confirmado';
                badgeStatus.classList.add('confirmado');
                botaoCard.classList.add('confirmado');
                botaoCard.title = 'Consulta Confirmada';
                modalBootstrap.hide();
            });

            if (modo === 'detalhes') {
                const wrapperCard = this.querySelector(`#caixa-card-${idUnico}`);
                const painelExpandir = this.querySelector(`#painel-${idUnico}`);
                const indicadorSeta = this.querySelector(`#indicador-${idUnico}`);

                const btnRotas = this.querySelector('.btn-rotas');
                const btnClima = this.querySelector('.btn-clima');

                wrapperCard.style.cursor = 'pointer';

                wrapperCard.addEventListener('click', (e) => {
                    // Evita que clicar nos botões expanda/recolha a gaveta
                    if (e.target.closest('.novo-btn-confirmar') || e.target.closest('.btn-acao-extra')) {
                        return;
                    }
                    painelExpandir.classList.toggle('aberto');
                    indicadorSeta.classList.toggle('aberto');
                });

                const modalAvisoEl = this.querySelector(`#modal-aviso-${idUnico}`);
                const modalAvisoBs = new bootstrap.Modal(modalAvisoEl);
                const avisoIcone = this.querySelector(`#aviso-icone-${idUnico}`);
                const avisoTitulo = this.querySelector(`#aviso-titulo-${idUnico}`);
                const avisoTexto = this.querySelector(`#aviso-texto-${idUnico}`);

                if (btnRotas) {
                    btnRotas.addEventListener('click', () => {
                        avisoIcone.innerHTML = `<i class="bi bi-whatsapp" style="color: #25D366;"></i>`;
                        avisoTitulo.textContent = "Rota Enviada!";
                        avisoTexto.innerHTML = `<h6>A rota até a clínica foi enviada com sucesso para o seu <strong>WhatsApp</strong> cadastrado.</h6>`;
                        
                        modalAvisoBs.show(); 
                    });
                }

                if (btnClima) {
                    btnClima.addEventListener('click', () => {
                        const diaAtualizado = this.querySelector(`#txt-dia-${idUnico}`).textContent;
                        const mesAtualizado = this.querySelector(`#txt-mes-${idUnico}`).textContent;
                        
                        avisoIcone.innerHTML = `<i class="bi bi-cloud-sun-fill text-warning"></i>`;
                        avisoTitulo.textContent = "Previsão do Tempo";
                        avisoTexto.innerHTML = `<h6>Para o dia <strong>${diaAtualizado} de ${mesAtualizado}</strong> a previsão é de 26°C, com dia ensolarado e poucas nuvens.</h6>`;
                        
                        modalAvisoBs.show(); 
                    });
                }
            }
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