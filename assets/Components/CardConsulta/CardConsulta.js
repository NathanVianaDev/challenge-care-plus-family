export class CardConsulta extends HTMLElement {
    connectedCallback() {
        const dia = this.getAttribute('dia') || '00';
        const mes = this.getAttribute('mes') || 'MÊS';
        const especialidade = this.getAttribute('especialidade') || 'Especialidade';
        const profissional = this.getAttribute('profissional') || 'Nome do Profissional';
        const horario = this.getAttribute('horario') || '00:00';
        
        let isConfirmado = false;

        // Criamos um ID único para o Modal, para que um card não abra o Modal do outro sem querer
        const idUnico = Math.random().toString(36).substr(2, 9);

        this.innerHTML = `
            <div class="card-consulta d-flex align-items-center p-3 shadow-sm border-0 bg-white">
                <div class="data-badge text-center p-2 rounded-4 me-4" style="background-color: #f0f8ff; min-width: 80px;">
                    <span class="d-block fw-bold fs-4 color-azul">${dia}</span>
                    <span class="text-muted small fw-bold">${mes}</span>
                </div>
                
                <div class="flex-grow-1">
                    <h5 class="fw-bold mb-1">${especialidade}</h5>
                    <p class="text-muted mb-0 small"><i class="bi bi-person-fill me-1"></i> ${profissional}</p>
                </div>
                
                <div class="text-end me-4">
                    <span class="fw-bold d-block">${horario}</span>
                    <span class="badge-status badge rounded-pill bg-secondary text-white px-3">Desconfirmado</span>
                </div>
                
                <button class="btn-mudar-status btn btn-secondary rounded-circle shadow-sm d-flex align-items-center justify-content-center" 
                        style="width: 45px; height: 45px;" title="Confirmar Consulta">
                    <i class="icone-status bi bi-check-lg text-white fs-4"></i>
                </button>
            </div>

            <div class="modal fade" id="modal-${idUnico}" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content border-0 shadow">
                        <div class="modal-header border-0 pb-0">
                            <h5 class="modal-title fw-bold" style="color: #3aadde;">Confirmar Agendamento</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-muted">
                            Deseja confirmar sua consulta de <strong>${especialidade}</strong> com <strong>${profissional}</strong> para o dia <strong>${dia} de ${mes}</strong> às <strong>${horario}</strong>?<br><br>
                            <small class="text-danger fw-bold"><i class="bi bi-exclamation-triangle-fill"></i> Atenção: Após confirmada, não será possível desmarcar por aqui.</small>
                        </div>
                        <div class="modal-footer border-0 pt-0">
                            <button type="button" class="btn btn-light rounded-pill px-4" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-success rounded-pill px-4 btn-confirmar-modal">Sim, Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Lógica de Interatividade
        const botaoCard = this.querySelector('.btn-mudar-status');
        const badge = this.querySelector('.badge-status');
        const modalElement = this.querySelector('.modal');
        const btnConfirmarModal = this.querySelector('.btn-confirmar-modal');

        // Inicializamos o Modal usando o JavaScript nativo do Bootstrap
        const modalBootstrap = new bootstrap.Modal(modalElement);

        // Ação 1: Quando clica no botão redondo do card
        botaoCard.addEventListener('click', () => {
            if (isConfirmado) return; 
            modalBootstrap.show();
        });

        // Ação 2: Quando clica no botão verde "Sim, Confirmar" DENTRO do Modal
        btnConfirmarModal.addEventListener('click', () => {
            isConfirmado = true;

            // Atualiza as cores do card para Verde
            badge.textContent = 'Confirmado';
            badge.classList.replace('bg-secondary', 'bg-success-subtle');
            badge.classList.replace('text-white', 'text-success');
            
            botaoCard.classList.replace('btn-secondary', 'btn-success');
            botaoCard.style.cursor = 'default';
            botaoCard.title = 'Consulta Confirmada';

            // Esconde o modal automaticamente após confirmar
            modalBootstrap.hide();
        });
    }
}

customElements.define('card-consulta', CardConsulta);