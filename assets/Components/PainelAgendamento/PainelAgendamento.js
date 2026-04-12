export class PainelAgendamento extends HTMLElement {
    connectedCallback() {
        this.mesAtualIndice = 0; 
        this.dataHojeDiscreta = "12/04/2026 às 09:00";
        this.diaHojeCalculo = 12; 
        
        this.mesesDados = [
            { nome: "Abril 2026", diasTotal: 30, diaInicioSemana: 3 }, 
            { nome: "Maio 2026", diasTotal: 31, diaInicioSemana: 5 }
        ];

        // Bloqueia o calendário até Especialidade e Unidade estarem preenchidos
        this.calendarioDesbloqueado = false;

        this.render();
        this.initCalendar();
        this.initWaitlistToggle();
        this.initFiltrosDinamicos(); 
    }

    render() {
        this.innerHTML = `
            <div class="agendamento-container">
                <h2 class="section-title">Agendar Nova Consulta</h2>
                
                <div class="row">
                    <div class="col-lg-6 pr-lg-4">
                        
                        <div class="form-floating-custom select-wrapper">
                            <label class="form-label">Especialidade <span class="text-danger">*</span></label>
                            <select class="filtro-obrigatorio" id="especialidade">
                                <option value="" disabled selected>Selecione a especialidade...</option>
                                <option>Clínico Geral</option>
                                <option>Cardiologista</option>
                                <option>Psicólogo</option>
                                <option>Odontologista</option>
                            </select>
                        </div>

                        <div class="form-floating-custom select-wrapper">
                            <label class="form-label">Unidade <span class="text-danger">*</span></label>
                            <select class="filtro-obrigatorio" id="unidade">
                                <option value="" disabled selected>Selecione a unidade...</option>
                                <option>Unidade Paulista</option>
                                <option>Unidade Faria Lima</option>
                                <option>Telemedicina (Online)</option>
                            </select>
                        </div>

                        <div class="form-floating-custom select-wrapper">
                            <label class="form-label">Profissional</label>
                            <select class="filtro-agenda" id="medico">
                                <option>Sem preferência</option>
                                <option>Dr. Roberto Alves</option>
                                <option>Dra. Camila Nogueira</option>
                            </select>
                        </div>

                        <div id="horarios-container" style="display: none;">
                            <label class="form-label" style="color: #92C444;">Horários da Clínica (1h/cada)</label>
                            <div class="time-slots-grid" id="time-slots-area"></div>
                        </div>
                    </div>

                    <div class="col-lg-6 mt-4 mt-lg-0">
                        <div class="calendar-top-bar">
                            <span class="current-datetime">Atual: ${this.dataHojeDiscreta}</span>
                            <div>
                                <button class="calendar-nav-btn" id="btnPrevMonth" disabled>❮</button>
                                <span class="month-title" id="displayMes">Abril 2026</span>
                                <button class="calendar-nav-btn" id="btnNextMonth">❯</button>
                            </div>
                        </div>

                        <div class="calendar-wrapper">
                            <div class="calendar-header" id="diasSemanaHeader">
                                <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sáb</div>
                            </div>
                            <div class="calendar-grid" id="calendarGrid"></div>
                        </div>

                        <div class="calendar-legend">
                            <div class="legend-item"><div class="dot dot-green"></div> Horários disponíveis</div>
                            <div class="legend-item"><div class="dot dot-orange"></div> Poucos horários disponíveis</div>
                            <div class="legend-item"><div class="dot dot-gray"></div> Sem atendimento</div>
                        </div>
                    </div>
                </div>

                <div class="action-agendar-section" id="containerAgendarNormal" style="display: none;">
                    <button class="btn-agendar-normal" id="btnAgendarNormal">Confirmar Agendamento</button>
                </div>

                <div class="waitlist-section">
                    <button class="btn-waitlist-toggle" id="btnWaitlist">Precisa de um encaixe? Entre na fila de espera</button>
                    
                    <div class="waitlist-content" id="waitlistContent">
                        <div class="waitlist-alert">
                            <strong>Atenção:</strong> Esta área é reservada para ficar em Fila de espera, por favor informe seus dados abaixo para que o sistema te avise através do Whatsapp quando abrir uma vaga. Preste atenção nos horários: porque o sistema pode te notificar sobre um horário próximo. Antes de confirmar, certifique-se que tem condições de chegar na clínica selecionada dentro do horário.
                        </div>
                        
                        <div class="form-check custom-checkbox">
                            <input class="form-check-input" type="checkbox" id="autorizaMsg">
                            <label class="form-check-label" for="autorizaMsg">
                                Eu autorizo as Clínicas da Care Plus entrarem em contato para confirmar o encaixe.
                            </label>
                        </div>

                        <div id="waitlistFormFields" class="d-none">
                            <div class="row g-3">
                                <div class="col-12">
                                    <div class="form-floating-custom mb-0">
                                        <label class="form-label">Informe seu Nome Completo</label>
                                        <input type="text" id="inputNome" placeholder="Digite seu nome completo">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating-custom mb-0">
                                        <label class="form-label">Seu WhatsApp (com DDD)</label>
                                        <input type="tel" id="inputWhats" placeholder="(11) 90000-0000" maxlength="15">
                                    </div>
                                </div>
                                <div class="col-md-6 d-flex align-items-end">
                                    <button class="btn-confirmar m-0" id="btnConfirmarEspera">Confirmar Fila de Espera</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="modalSucesso" class="modal-overlay hidden">
                <div class="custom-modal">
                    <img src="/assets/Images/logo-care-plus.png" alt="Care Plus" class="modal-logo" onerror="this.style.display='none';">
                    <h3 class="modal-title" style="color: #92C444;" id="modalTitulo">Título</h3>
                    <p class="modal-message" id="modalTexto">Mensagem</p>
                    <button class="btn-modal" id="btnFecharModal">Entendi</button>
                </div>
            </div>
        `;
    }

    initFiltrosDinamicos() {
        const selectsObrigatorios = this.querySelectorAll('.filtro-obrigatorio');
        const selectMedico = this.querySelector('#medico');

        const validarDesbloqueio = () => {
            const especialidade = this.querySelector('#especialidade').value;
            const unidade = this.querySelector('#unidade').value;

            if (especialidade && unidade) {
                this.calendarioDesbloqueado = true;
                this.esconderHorarios();
                this.desenharMes(true); 
            }
        };

        selectsObrigatorios.forEach(select => {
            select.addEventListener('change', validarDesbloqueio);
        });

        selectMedico.addEventListener('change', () => {
            if (this.calendarioDesbloqueado) {
                this.esconderHorarios();
                this.desenharMes(true);
            }
        });
    }

    initCalendar() {
        const btnPrev = this.querySelector('#btnPrevMonth');
        const btnNext = this.querySelector('#btnNextMonth');

        btnPrev.addEventListener('click', () => {
            if (this.mesAtualIndice > 0) {
                this.mesAtualIndice--;
                btnNext.disabled = false;
                if (this.mesAtualIndice === 0) btnPrev.disabled = true;
                this.esconderHorarios();
                this.desenharMes(false);
            }
        });

        btnNext.addEventListener('click', () => {
            this.mesAtualIndice++;
            btnPrev.disabled = false;
            this.esconderHorarios();
            this.desenharMes(false);
        });

        this.desenharMes(false);
    }

    desenharMes(randomizarDados) {
        const grid = this.querySelector('#calendarGrid');
        const displayMes = this.querySelector('#displayMes');
        const headerDias = this.querySelector('#diasSemanaHeader');
        const btnNext = this.querySelector('#btnNextMonth');

        if (this.mesAtualIndice > 1) {
            displayMes.innerText = "Julho 2026 em diante";
            headerDias.style.display = 'none';
            grid.innerHTML = `<div class="agenda-fechada-msg">Agenda Fechada.<br>Novas datas serão liberadas em breve.</div>`;
            btnNext.disabled = true;
            return;
        }

        headerDias.style.display = 'grid';
        const dadosMes = this.mesesDados[this.mesAtualIndice];
        displayMes.innerText = dadosMes.nome;
        
        let diasHTML = '';
        for(let v = 0; v < dadosMes.diaInicioSemana; v++) {
            diasHTML += `<div></div>`;
        }

        for(let i = 1; i <= dadosMes.diasTotal; i++) {
            if (!this.calendarioDesbloqueado) {
                diasHTML += `<div class="calendar-day day-disabled">${i}</div>`;
                continue; 
            }

            let diaDaSemana = (i + dadosMes.diaInicioSemana - 1) % 7; 
            let isFinalDeSemana = (diaDaSemana === 0 || diaDaSemana === 6);
            let isPassado = (this.mesAtualIndice === 0 && i < this.diaHojeCalculo);

            if (isFinalDeSemana || isPassado) {
                diasHTML += `<div class="calendar-day day-disabled">${i}</div>`;
            } else {
                let status = 'day-green'; 
                let tipo = 'green';

                if (randomizarDados) {
                    let chance = Math.random();
                    if(chance < 0.2) { status = 'day-disabled'; tipo = 'disabled'; }
                    else if(chance < 0.5) { status = 'day-orange'; tipo = 'orange'; }
                } else {
                    if (i === 15 || i === 22) status = 'day-disabled';
                    else if(i === 14 || i === 18 || i === 25) { status = 'day-orange'; tipo = 'orange'; }
                }

                if (status === 'day-disabled') {
                    diasHTML += `<div class="calendar-day day-disabled">${i}</div>`;
                } else {
                    diasHTML += `<div class="calendar-day ${status} clickable-day" data-tipo="${tipo}">${i}</div>`;
                }
            }
        }
        grid.innerHTML = diasHTML;

        const clickableDays = grid.querySelectorAll('.clickable-day');
        clickableDays.forEach(dayBtn => {
            dayBtn.addEventListener('click', () => {
                clickableDays.forEach(d => d.classList.remove('active'));
                dayBtn.classList.add('active'); 
                const tipoDia = dayBtn.getAttribute('data-tipo');
                this.mostrarHorarios(tipoDia);
            });
        });
    }

    mostrarHorarios(tipoDia) {
        const container = this.querySelector('#horarios-container');
        const area = this.querySelector('#time-slots-area');
        const btnAgendarNormal = this.querySelector('#containerAgendarNormal');
        
        let horariosPossiveis = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
        let horariosEmbaralhados = [...horariosPossiveis].sort(() => 0.5 - Math.random());
        let indicesHabilitados = [];

        if (tipoDia === 'orange') {
            indicesHabilitados = horariosEmbaralhados.slice(0, 3);
        } else {
            indicesHabilitados = horariosEmbaralhados.slice(0, 5);
        }

        let slots = '';
        for(let h of horariosPossiveis) {
            let horaFormatada = h < 10 ? `0${h}:00` : `${h}:00`;
            if (indicesHabilitados.includes(h)) {
                slots += `<button class="time-slot-btn">${horaFormatada}</button>`;
            } else {
                slots += `<button class="time-slot-btn" disabled>${horaFormatada}</button>`;
            }
        }
        area.innerHTML = slots;
        container.style.display = 'block';

        const botoesHorario = area.querySelectorAll('.time-slot-btn:not([disabled])');
        botoesHorario.forEach(btn => {
            btn.addEventListener('click', () => {
                botoesHorario.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                
                btnAgendarNormal.style.display = 'block';
            });
        });
    }

    esconderHorarios() {
        this.querySelector('#horarios-container').style.display = 'none';
        this.querySelector('#containerAgendarNormal').style.display = 'none';
    }

    initWaitlistToggle() {
        const btnWaitlist = this.querySelector('#btnWaitlist');
        const content = this.querySelector('#waitlistContent');
        const checkboxAuth = this.querySelector('#autorizaMsg');
        const waitlistForm = this.querySelector('#waitlistFormFields');
        const btnConfirmarEspera = this.querySelector('#btnConfirmarEspera');
        
        const btnAgendarNormal = this.querySelector('#btnAgendarNormal');
        const modal = this.querySelector('#modalSucesso');
        const modalTitulo = this.querySelector('#modalTitulo');
        const modalTexto = this.querySelector('#modalTexto');
        const btnFecharModal = this.querySelector('#btnFecharModal');
        const inputNome = this.querySelector('#inputNome');
        const inputWhats = this.querySelector('#inputWhats');
        const dropdowns = this.querySelectorAll('select');

        inputWhats.addEventListener('input', function (e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });

        btnWaitlist.addEventListener('click', () => {
            content.classList.toggle('show');
            if(content.classList.contains('show')) {
                btnWaitlist.innerText = "Ocultar Fila de Espera";
                btnWaitlist.style.backgroundColor = "#3aadde";
                btnWaitlist.style.color = "white";
            } else {
                btnWaitlist.innerText = "Precisa de um encaixe? Entre na fila de espera";
                btnWaitlist.style.backgroundColor = "transparent";
                btnWaitlist.style.color = "#3aadde";
            }
        });

        checkboxAuth.addEventListener('change', (e) => {
            if (e.target.checked) {
                waitlistForm.classList.remove('d-none');
                waitlistForm.classList.add('d-block'); 
            } else {
                waitlistForm.classList.remove('d-block');
                waitlistForm.classList.add('d-none');
            }
        });

        const limparTelaGeral = () => {
            inputNome.value = "";
            inputWhats.value = "";
            checkboxAuth.checked = false;
            
            waitlistForm.classList.remove('d-block');
            waitlistForm.classList.add('d-none');
            content.classList.remove('show');
            btnWaitlist.innerText = "Precisa de um encaixe? Entre na fila de espera";
            btnWaitlist.style.backgroundColor = "transparent";
            btnWaitlist.style.color = "#3aadde";

            dropdowns.forEach(s => s.selectedIndex = 0);
            this.calendarioDesbloqueado = false;
            this.esconderHorarios();
            this.desenharMes(false); 
        };

        btnAgendarNormal.addEventListener('click', () => {
            modalTitulo.innerText = "Consulta Agendada!";
            modalTexto.innerHTML = "Sua consulta foi agendada com sucesso.<br><br>Um email foi enviado para o endereço de cadastro com as informações do Agendamento. Caso não receba o email, por favor, entre em contato com nossas unidades.";
            modal.classList.remove('hidden');
            limparTelaGeral();
        });

        btnConfirmarEspera.addEventListener('click', () => {
            modalTitulo.innerText = "Fila de Espera Confirmada!";
            modalTexto.innerHTML = "Assim que surgir um encaixe em nossas clínicas você será avisado através do número do WhatsApp que informou na hora do agendamento.<br><br>Aguarde nosso contato em breve!";
            modal.classList.remove('hidden');
            limparTelaGeral();
        });

        btnFecharModal.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }
}

if (!customElements.get('painel-agendamento')) {
    customElements.define('painel-agendamento', PainelAgendamento);
}