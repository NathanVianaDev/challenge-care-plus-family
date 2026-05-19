document.addEventListener('DOMContentLoaded', () => {
    
    const consultas = [
        { 
            id: 1, dia: '05', mes: 'MAR', especialidade: 'Cardiologia', medico: 'Dr. Roberto Silva', horario: '09:30', status: 'Aguardando confirmação', 
            corBase: '#3aadde', 
            fundoGradiente: 'linear-gradient(to right, #d4f0fa, #8ed5f3)', 
            dataReal: new Date('2026-05-05T09:30:00') 
        },
        { 
            id: 2, dia: '17', mes: 'MAR', especialidade: 'Dermatologia', medico: 'Dra. Ana Costa', horario: '14:30', status: 'Aguardando confirmação', 
            corBase: '#92C444',
            fundoGradiente: 'linear-gradient(to right, #eff7e1, #c8e899)', 
            dataReal: new Date('2026-05-17T14:30:00') 
        },
        { 
            id: 3, dia: '27', mes: 'MAR', especialidade: 'Cardiologia', medico: 'Dr. Roberto Silva', horario: '09:30', status: 'Realizada', 
            corBase: '#3aadde', 
            fundoGradiente: 'linear-gradient(to right, #d4f0fa, #8ed5f3)', 
            dataReal: new Date('2026-02-10T10:00:00')
        }
    ];

    const containerConsultas = document.getElementById('lista-consultas');
    const dataAtual = new Date('2026-04-30'); 

    function renderizarConsultas() {
        if (!containerConsultas) return; 

        containerConsultas.innerHTML = '';

        consultas.forEach(consulta => {
            const isFutura = consulta.dataReal > dataAtual;
            
            const botoesDisabled = !isFutura ? 'disabled' : '';
            const opacityClass = !isFutura ? 'opacity-50' : '';

            const cardHTML = `
                <div class="card-consulta ${opacityClass} position-relative overflow-hidden" style="background: ${consulta.fundoGradiente}; padding: 0;">
                    
                    <!-- Faixa lateral esquerda com a data -->
                    <div class="bg-white h-100 d-flex flex-column justify-content-center align-items-center" style="min-width: 110px; min-height: 120px; border-radius: 15px 30px 30px 15px; border-left: 8px solid ${consulta.corBase}; z-index: 1; box-shadow: 2px 0 10px rgba(0,0,0,0.05);">
                        <span class="fs-2 fw-bold" style="color: ${consulta.corBase}; line-height: 1;">${consulta.dia}</span>
                        <span class="fw-bold" style="color: #999; font-size: 0.85rem;">${consulta.mes}</span>
                    </div>
                    
                    <!-- Conteúdo do Card -->
                    <div class="flex-grow-1 d-flex flex-column flex-md-row justify-content-between align-items-md-center px-4 py-3">
                        <div>
                            <h4 class="fw-bold mb-1" style="color: ${consulta.corBase};">${consulta.especialidade}</h4>
                            <p class="text-muted mb-0 small"><i class="bi bi-person-fill me-1"></i>${consulta.medico}</p>
                        </div>

                        <div class="d-flex flex-column align-items-md-end gap-2 mt-3 mt-md-0">
                            <div class="d-flex align-items-center gap-2">
                                <span class="badge rounded-pill" style="background-color: #8c939e; padding: 6px 12px; font-weight: 500;">${consulta.status}</span>
                                <span class="fw-bold text-dark fs-5 ms-2">${consulta.horario}</span>
                            </div>
                            
                            <!-- Botões de Ação (Apenas para esta tela) -->
                            <div class="mt-2 d-flex gap-2">
                                <button class="btn btn-sm bg-white rounded-pill px-3 fw-bold btn-remarcar" data-id="${consulta.id}" style="color: ${consulta.corBase}; border: 1px solid ${consulta.corBase}; box-shadow: 0 2px 5px rgba(0,0,0,0.1);" ${botoesDisabled}>
                                    Remarcar
                                </button>
                                <button class="btn btn-sm btn-danger rounded-pill px-3 fw-bold shadow-sm btn-cancelar" data-id="${consulta.id}" ${botoesDisabled}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            containerConsultas.insertAdjacentHTML('beforeend', cardHTML);
        });

        adicionarEventosBotoes();
    }

    function adicionarEventosBotoes() {
        document.querySelectorAll('.btn-remarcar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modalGlobal = document.getElementById('alerta-global');
                
                if (modalGlobal) {
                    modalGlobal.disparar(
                        "Consulta Cancelada", 
                        "Sua consulta atual foi cancelada. Você será redirecionado para agendar um novo horário."
                    );

                    setTimeout(() => {
                        window.location.href = '../PainelAgendamento/PainelAgendamento.html';
                    }, 3500);
                } else {
                    console.error("Componente de alerta global não encontrado.");
                }
            });
        });

        let consultaIdParaCancelar = null;
        const elementoModalMotivo = document.getElementById('modalMotivoCancelamento');
        
        if (elementoModalMotivo) {
            const modalMotivo = new bootstrap.Modal(elementoModalMotivo);

            document.querySelectorAll('.btn-cancelar').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    consultaIdParaCancelar = e.target.closest('button').getAttribute('data-id');
                    document.getElementById('texto-motivo').value = ''; 
                    modalMotivo.show();
                });
            });

            const btnConfirmar = document.getElementById('btn-confirmar-cancelamento');
            if (btnConfirmar) {
                btnConfirmar.addEventListener('click', () => {
                    const motivo = document.getElementById('texto-motivo').value;
                    
                    if(motivo.trim() === '') {
                        alert('Por favor, informe o motivo do cancelamento.'); 
                        return;
                    }

                    modalMotivo.hide();
                    
                    const modalGlobal = document.getElementById('alerta-global');
                    if (modalGlobal) {
                        modalGlobal.disparar(
                            "Cancelamento Concluído", 
                            "Sua consulta foi cancelada com sucesso. O motivo foi registrado."
                        );
                    }
                    
                    console.log(`Consulta ${consultaIdParaCancelar} cancelada. Motivo: ${motivo}`);
                });
            }
        }
    }

    renderizarConsultas();
});