// assets/Components/PainelAgendamento/PainelAgendamento.js

export class PainelAgendamento extends HTMLElement {
    connectedCallback() {
        this.mesAtualIndice = 0;
        this.diaHojeCalculo = 12;
        this.mesesDados = [
            { nome: "Abril 2026", diasTotal: 30, diaInicioSemana: 3 },
            { nome: "Maio 2026", diasTotal: 31, diaInicioSemana: 5 }
        ];

        this.calendarioDesbloqueado = false;
        this.render();
        this.initFiltrosDinamicos();
        this.initCalendar();
        this.initWaitlistLogic();
        this.initAcoesFinais();
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
                            <option value="Clínico Geral">Clínico Geral</option>
                            <option value="Cardiologista">Cardiologista</option>
                            <option value="Psicólogo">Psicólogo</option>
                            <option value="Odontologista">Odontologista</option>
                        </select>
                    </div>

                    <div class="form-floating-custom select-wrapper">
                        <label class="form-label">Unidade <span class="text-danger">*</span></label>
                        <select class="filtro-obrigatorio" id="unidade">
                            <option value="" disabled selected>Selecione a unidade...</option>
                            <option value="Unidade Paulista">Unidade Paulista</option>
                            <option value="Unidade Faria Lima">Unidade Faria Lima</option>
                            <option value="Telemedicina (Online)">Telemedicina (Online)</option>
                        </select>
                    </div>

                    <div class="form-floating-custom select-wrapper d-none" id="containerMedico">
                        <label class="form-label">Profissional Disponível</label>
                        <select id="medico">
                            <option value="Sem preferência">Sem preferência (Mais rápido)</option>
                        </select>
                    </div>

                    <div class="waitlist-section mb-4 d-none" id="containerWaitlistToggle">
                        <button class="btn-waitlist-toggle w-100" id="btnWaitlist">Precisa de um encaixe? Entre na fila de espera</button>
                    </div>

                    <div id="horarios-container" style="display: none;">
                        <label class="form-label" style="color: #92C444;">Horários Disponíveis (1h/cada)</label>
                        <div class="time-slots-grid" id="time-slots-area"></div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="calendar-wrapper">
                        <div class="calendar-top-bar px-2">
                            <span class="month-title" id="displayMes">Abril 2026</span>
                            <div>
                                <button class="calendar-nav-btn" id="btnPrevMonth" disabled>❮</button>
                                <button class="calendar-nav-btn" id="btnNextMonth">❯</button>
                            </div>
                        </div>
                        <div class="calendar-grid mt-3" id="calendarGrid"></div>
                    </div>

                    <div class="calendar-legend mt-4">
                        <div class="legend-item"><div class="dot dot-green"></div> Horários disponíveis</div>
                        <div class="legend-item"><div class="dot dot-orange"></div> Poucos horários disponíveis</div>
                        <div class="legend-item"><div class="dot dot-gray"></div> Sem atendimento</div>
                    </div>
                </div>
            </div>

            <div class="action-agendar-section mt-4 d-none" id="containerAgendarNormal">
                <button class="btn-agendar-normal" id="btnAgendarNormal">Confirmar Agendamento</button>
            </div>
        </div>

        <div id="modalConfirmacaoFinal" class="modal-overlay hidden">
            <div class="custom-modal" style="max-width: 500px; font-family: 'Montserrat', sans-serif;">
                <img src="/assets/Images/logo-care-plus.png" alt="Care Plus" class="modal-logo" style="height: 50px; margin-bottom: 20px;">
                <h3 class="modal-title" style="color: #3aadde; font-weight: 800;">Confirmar Agendamento</h3>
                <p id="textoConfirmacaoAgendamento" class="modal-message" style="color: #555; font-size: 1.05rem;"></p>
                
                <p class="text-danger fw-bold small mb-4">
                    <i class="bi bi-exclamation-triangle-fill"></i> 
                    Atenção: Após confirmada, não será possível desmarcar por aqui.
                </p>

                <div class="d-flex gap-2">
                    <button class="btn btn-light rounded-pill w-100 fw-bold py-2" id="btnCancelarConfirmacao" style="background-color: #f8f9fa; border: 1px solid #ddd;">Cancelar</button>
                    <button class="btn-agendar-normal w-100 py-2" id="btnSimConfirmarFinal" style="background-color: #2e7d32; border-radius: 50px; color: white; border: none; font-weight: 700;">Sim, Confirmar</button>
                </div>
            </div>
        </div>

        <div id="modalFilaEspera" class="modal-overlay hidden">
            <div class="custom-modal" style="max-width: 500px;">
                <img src="/assets/Images/logo-care-plus.png" alt="Care Plus" class="modal-logo">
                <h3 class="modal-title">Solicitar Fila de Espera</h3>
                <div class="text-start p-3 bg-light rounded mb-4" style="font-size: 0.9rem;">
                    <p class="mb-1"><strong>Especialidade:</strong> <span id="resumoEsp"></span></p>
                    <p class="mb-1"><strong>Unidade:</strong> <span id="resumoUni"></span></p>
                </div>
                
                <div class="form-floating-custom mb-3 text-start">
                    <label class="form-label">Dia que deseja aguardar</label>
                    <input type="date" id="filaData" class="form-control" required>
                    <div id="erroFilaData" class="text-danger mt-1 d-none" style="font-size: 0.85rem; font-weight: 500;">
                        <i class="bi bi-exclamation-circle"></i> Por favor, preencha este campo.
                    </div>
                </div>
                
                <div class="form-floating-custom mb-4 text-start select-wrapper">
                    <label class="form-label">Período preferencial</label>
                    <select id="filaPeriodo" class="form-control">
                        <option value="Manhã">Manhã (08h às 12h)</option>
                        <option value="Tarde">Tarde (13h às 18h)</option>
                        <option value="Qualquer Período">Qualquer Período</option>
                    </select>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-secondary rounded-pill w-100" id="btnFecharFila">Voltar</button>
                    <button class="btn-confirmar rounded-pill w-100" id="btnConfirmarFilaFinal">Entrar na Fila</button>
                </div>
            </div>
        </div>

        <div id="modalSucessoInterno" class="modal-overlay hidden">
            <div class="custom-modal">
                <img src="/assets/Images/logo-care-plus.png" alt="Care Plus" class="modal-logo">
                <h3 class="modal-title" id="tituloSucesso" style="color: #92C444;">Sucesso!</h3>
                <p class="modal-message" id="mensagemSucesso"></p>
                <button class="btn-modal w-100 mt-4" id="btnEntendiSucesso">Entendi</button>
            </div>
        </div>
    `;
    }

    initFiltrosDinamicos() {
        const esp = this.querySelector('#especialidade');
        const uni = this.querySelector('#unidade');
        const medicoSelect = this.querySelector('#medico');
        const containerMedico = this.querySelector('#containerMedico');
        const waitlistToggle = this.querySelector('#containerWaitlistToggle');

        const medicosDB = {
            "Clínico Geral": ["Dr. Roberto Alves", "Dra. Camila Nogueira"],
            "Cardiologista": ["Dr. Sérgio Mendes", "Dra. Ana Paula"],
            "Psicólogo": ["Dra. Helena Silva", "Dr. Bruno Zamboni"],
            "Odontologista": ["Dr. Luiz Castro"]
        };

        const atualizarFluxo = () => {
            if (esp.value && uni.value) {
                const lista = medicosDB[esp.value] || [];
                medicoSelect.innerHTML = '<option value="Sem preferência">Sem preferência (Mais rápido)</option>';
                lista.forEach(m => medicoSelect.insertAdjacentHTML('beforeend', `<option value="${m}">${m}</option>`));

                this.calendarioDesbloqueado = true;
                containerMedico.classList.remove('d-none');
                waitlistToggle.classList.remove('d-none');
                this.desenharMes();
            }
        };

        esp.addEventListener('change', atualizarFluxo);
        uni.addEventListener('change', atualizarFluxo);
    }

    initAcoesFinais() {
        const btnAgendar = this.querySelector('#btnAgendarNormal');
        const modal = this.querySelector('#modalSucessoInterno');
        const titulo = this.querySelector('#tituloSucesso');
        const msg = this.querySelector('#mensagemSucesso');
        const btnFechar = this.querySelector('#btnEntendiSucesso');

        btnAgendar.addEventListener('click', () => {
            const esp = this.querySelector('#especialidade').value;
            const uni = this.querySelector('#unidade').value;
            const med = this.querySelector('#medico').value;
            const dia = this.querySelector('.clickable-day.active').innerText;
            const mes = this.querySelector('#displayMes').innerText;
            const hora = this.querySelector('.time-slot-btn.selected').innerText;

            titulo.innerText = "Consulta Agendada!";
            msg.innerHTML = `Sua consulta de <strong>${esp}</strong> com <strong>${med}</strong> foi confirmada.<br><br>
                             <strong>Data:</strong> ${dia} de ${mes}<br>
                             <strong>Horário:</strong> ${hora}<br>
                             <strong>Unidade:</strong> ${uni}`;

            modal.classList.remove('hidden');
        });

        btnFechar.addEventListener('click', () => {
            modal.classList.add('hidden');
            location.reload();
        });
    }

    initWaitlistLogic() {
        const btnWaitlist = this.querySelector('#btnWaitlist');
        const modalFila = this.querySelector('#modalFilaEspera');
        const btnConfirmarFila = this.querySelector('#btnConfirmarFilaFinal');
        const modalSucesso = this.querySelector('#modalSucessoInterno');
        const tituloSucesso = this.querySelector('#tituloSucesso');
        const msgSucesso = this.querySelector('#mensagemSucesso');
        
        // Elementos de Validação
        const inputFilaData = this.querySelector('#filaData');
        const erroFilaData = this.querySelector('#erroFilaData');

        btnWaitlist.addEventListener('click', () => {
            this.querySelector('#resumoEsp').innerText = this.querySelector('#especialidade').value;
            this.querySelector('#resumoUni').innerText = this.querySelector('#unidade').value;
            modalFila.classList.remove('hidden');
        });

        // Evento para limpar o erro quando o usuário escolhe uma data
        inputFilaData.addEventListener('change', () => {
            if (inputFilaData.value) {
                inputFilaData.classList.remove('is-invalid');
                inputFilaData.style.borderColor = ''; // Reseta a cor da borda
                erroFilaData.classList.add('d-none'); // Esconde a mensagem
            }
        });

        this.querySelector('#btnFecharFila').addEventListener('click', () => {
            modalFila.classList.add('hidden');
            // Limpa o erro ao fechar o modal
            inputFilaData.classList.remove('is-invalid');
            inputFilaData.style.borderColor = '';
            erroFilaData.classList.add('d-none');
        });

        btnConfirmarFila.addEventListener('click', () => {
            const data = inputFilaData.value;
            const periodo = this.querySelector('#filaPeriodo').value;
            const esp = this.querySelector('#especialidade').value;

            // NOVA LÓGICA DE VALIDAÇÃO
            if (!data) {
                inputFilaData.classList.add('is-invalid');
                inputFilaData.style.borderColor = '#dc3545'; // Fica vermelho
                erroFilaData.classList.remove('d-none'); // Aparece a mensagem abaixo
                return;
            }

            modalFila.classList.add('hidden');
            tituloSucesso.innerText = "Fila de Espera Confirmada!";
            msgSucesso.innerHTML = `Você é o <strong>2º na fila de espera</strong> para <strong>${esp}</strong>.<br><br>
                                   Aguarde o contato da <strong>Care Plus</strong> via WhatsApp no número cadastrado.<br><br>
                                   <strong>Data solicitada:</strong> ${data}<br>
                                   <strong>Período:</strong> ${periodo}`;

            modalSucesso.classList.remove('hidden');
        });
    }

    initCalendar() {
        this.querySelector('#btnPrevMonth').addEventListener('click', () => {
            if (this.mesAtualIndice > 0) {
                this.mesAtualIndice--;
                this.querySelector('#btnNextMonth').disabled = false;
                if (this.mesAtualIndice === 0) this.querySelector('#btnPrevMonth').disabled = true;
                this.esconderHorarios();
                this.desenharMes();
            }
        });

        this.querySelector('#btnNextMonth').addEventListener('click', () => {
            this.mesAtualIndice++;
            this.querySelector('#btnPrevMonth').disabled = false;
            this.esconderHorarios();
            this.desenharMes();
        });

        this.desenharMes();
    }

    desenharMes() {
        const grid = this.querySelector('#calendarGrid');
        const dadosMes = this.mesesDados[this.mesAtualIndice];
        this.querySelector('#displayMes').innerText = dadosMes.nome;
        grid.innerHTML = '';

        for (let v = 0; v < dadosMes.diaInicioSemana; v++) grid.insertAdjacentHTML('beforeend', '<div></div>');

        for (let i = 1; i <= dadosMes.diasTotal; i++) {
            const diaSemana = (i + dadosMes.diaInicioSemana - 1) % 7;
            const isFimDeSemana = (diaSemana === 0 || diaSemana === 6); 
            const isPassado = (this.mesAtualIndice === 0 && i < this.diaHojeCalculo);

            if (!this.calendarioDesbloqueado || isPassado || isFimDeSemana) {
                grid.insertAdjacentHTML('beforeend', `<div class="calendar-day day-disabled">${i}</div>`);
            } else {
                const status = (i % 5 === 0) ? 'day-orange' : 'day-green';
                grid.insertAdjacentHTML('beforeend', `<div class="calendar-day ${status} clickable-day">${i}</div>`);
            }
        }

        this.querySelectorAll('.clickable-day').forEach(day => {
            day.addEventListener('click', () => {
                this.querySelectorAll('.clickable-day').forEach(d => d.classList.remove('active'));
                day.classList.add('active');
                this.mostrarHorarios();
            });
        });
    }

    mostrarHorarios() {
        const area = this.querySelector('#time-slots-area');
        const horarios = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

        area.innerHTML = horarios.map(h => {
            const isOcupado = Math.random() < 0.3; 
            return `<button class="time-slot-btn" ${isOcupado ? 'disabled' : ''}>${h}</button>`;
        }).join('');

        this.querySelector('#horarios-container').style.display = 'block';

        area.querySelectorAll('.time-slot-btn:not([disabled])').forEach(btn => {
            btn.addEventListener('click', () => {
                area.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.querySelector('#containerAgendarNormal').classList.remove('d-none');
            });
        });
    }

    esconderHorarios() {
        this.querySelector('#horarios-container').style.display = 'none';
        this.querySelector('#containerAgendarNormal').classList.add('d-none');
    }
}

if (!customElements.get('painel-agendamento')) customElements.define('painel-agendamento', PainelAgendamento);