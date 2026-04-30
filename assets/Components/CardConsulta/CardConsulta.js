// Arquivo: CardConsulta.js

export class CardConsulta extends HTMLElement {
    connectedCallback() {
        const dia = this.getAttribute('dia') || '00';
        const mes = this.getAttribute('mes') || 'MÊS';
        const especialidade = this.getAttribute('especialidade') || 'Especialidade';
        const profissional = this.getAttribute('profissional') || 'Nome do Profissional';
        const horario = this.getAttribute('horario') || '00:00';
        
        let isConfirmado = false;
        const idUnico = Math.random().toString(36).substr(2, 9);

        // --- LÓGICA DAS CORES ---
        const imgAzul = new URL('../../Images/FundoConsulta/consulta-azul.png', import.meta.url).href;
        const imgVerde = new URL('../../Images/FundoConsulta/consulta-verde.png', import.meta.url).href;
        const caminhoCSS = new URL('./CardConsulta.css', import.meta.url).href;

        let imagemEscolhida = imgAzul; 
        let corBorda = '#3aadde';     
        let corTitulo = '#3aadde';    
        let corFundoData = '#f0f8ff'; 

        const espMinuscula = especialidade.toLowerCase();

        if (espMinuscula.includes('derma') || espMinuscula.includes('odonto') || espMinuscula.includes('nutri') || espMinuscula.includes('psico')) {
            imagemEscolhida = imgVerde;
            corBorda = '#8cc63f';     
            corTitulo = '#8cc63f';    
            corFundoData = '#f4faeb'; 
        } 
        else {
            imagemEscolhida = imgAzul;
            corBorda = '#3aadde';
            corTitulo = '#3aadde';
            corFundoData = '#f0f8ff';
        }

        // --- INJETANDO O HTML ---
        this.innerHTML = `
            <link rel="stylesheet" href="${caminhoCSS}">
            
            <div class="card-consulta" 
                style="background-image: url('${imagemEscolhida}'); border-left: 6px solid ${corBorda} !important;">
                
                <div class="data-badge text-center p-2 rounded-4 me-4" style="background-color: ${corFundoData}; min-width: 80px;">
                    <span class="d-block fw-bold fs-4" style="color: ${corTitulo};">${dia}</span>
                    <span class="text-muted small fw-bold">${mes}</span>
                </div>
                
                <div class="flex-grow-1">
                    <h5 class="fw-bold mb-1" style="color: ${corTitulo};">${especialidade}</h5>
                    <p class="text-muted mb-0 small"><i class="bi bi-person-fill me-1"></i> ${profissional}</p>
                </div>
                
                <div class="text-end me-4">
                    <span class="fw-bold d-block text-dark">${horario}</span>
                    <span class="badge-status badge rounded-pill bg-secondary text-white px-3">Aguardando confirmação</span>
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
        const modalBootstrap = new bootstrap.Modal(modalElement);

        botaoCard.addEventListener('click', () => {
            if (isConfirmado) return; 
            modalBootstrap.show();
        });

        btnConfirmarModal.addEventListener('click', () => {
            isConfirmado = true;
            badge.textContent = 'Confirmado';
            badge.classList.replace('bg-secondary', 'bg-success-subtle');
            badge.classList.replace('text-white', 'text-success');
            
            botaoCard.classList.replace('btn-secondary', 'btn-success');
            botaoCard.style.cursor = 'default';
            botaoCard.title = 'Consulta Confirmada';
            modalBootstrap.hide();
        });
    }
}

customElements.define('card-consulta', CardConsulta);