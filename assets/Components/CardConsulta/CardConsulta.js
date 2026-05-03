// assets/Components/CardConsulta/CardConsulta.js

export class CardConsulta extends HTMLElement {
    connectedCallback() {
        const dia = this.getAttribute('dia') || '00';
        const mes = this.getAttribute('mes') || 'MÊS';
        const especialidade = this.getAttribute('especialidade') || 'Especialidade';
        const profissional = this.getAttribute('profissional') || 'Nome do Profissional';
        const horario = this.getAttribute('horario') || '00:00';
        
        let isConfirmado = false;
        const idUnico = Math.random().toString(36).substr(2, 9);

        // Ajuste nos caminhos das imagens para evitar erros de carregamento
        const imgAzul = '/assets/Images/FundoConsulta/consulta-azul.png';
        const imgVerde = '/assets/Images/FundoConsulta/consulta-verde.png';

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

        this.innerHTML = `
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

            <!-- Modal de Confirmação Integrado -->
            <div id="modal-${idUnico}" class="modal-overlay-card hidden">
                <div class="custom-modal-card">
                    <img src="/assets/Images/logo-care-plus.png" alt="Care Plus" class="modal-logo-card">
                    <h3 class="modal-title-card">Confirmar Agendamento</h3>
                    <p class="modal-message-card">
                        Deseja confirmar sua consulta de <strong>${especialidade}</strong> com <strong>${profissional}</strong> para o dia <strong>${dia} de ${mes} às ${horario}</strong>?
                    </p>
                    <p class="text-danger fw-bold small mb-4">
                        <i class="bi bi-exclamation-triangle-fill"></i> Atenção: Após confirmada, não será possível desmarcar por aqui.
                    </p>
                    <div class="d-flex gap-2">
                        <button class="btn-cancelar-card w-100">Cancelar</button>
                        <button class="btn-confirmar-card w-100">Sim, Confirmar</button>
                    </div>
                </div>
            </div>

            <style>
                .modal-overlay-card { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 10000; }
                .modal-overlay-card.hidden { display: none; }
                .custom-modal-card { background: #fff; border-radius: 20px; padding: 30px; width: 90%; max-width: 450px; text-align: center; font-family: 'Montserrat', sans-serif; }
                .modal-logo-card { height: 50px; margin-bottom: 15px; }
                .modal-title-card { color: #3aadde; font-weight: 800; margin-bottom: 15px; }
                .modal-message-card { color: #555; font-size: 1rem; margin-bottom: 20px; }
                .btn-cancelar-card { background: #f1f1f1; border: none; border-radius: 50px; padding: 10px; font-weight: 700; color: #666; }
                .btn-confirmar-card { background: #2e7d32; border: none; border-radius: 50px; padding: 10px; font-weight: 700; color: #fff; }
            </style>
        `;

        this.initEvents(idUnico);
    }

    initEvents(idUnico) {
        const botaoCard = this.querySelector('.btn-mudar-status');
        const badge = this.querySelector('.badge-status');
        const modalOverlay = this.querySelector('.modal-overlay-card');
        const btnConfirmar = this.querySelector('.btn-confirmar-card');
        const btnCancelar = this.querySelector('.btn-cancelar-card');

        botaoCard.addEventListener('click', () => modalOverlay.classList.remove('hidden'));
        btnCancelar.addEventListener('click', () => modalOverlay.classList.add('hidden'));

        btnConfirmar.addEventListener('click', () => {
            badge.textContent = 'Confirmado';
            badge.classList.replace('bg-secondary', 'bg-success-subtle');
            badge.classList.replace('text-white', 'text-success');
            botaoCard.classList.replace('btn-secondary', 'btn-success');
            modalOverlay.classList.add('hidden');
        });
    }
}

if (!customElements.get('card-consulta')) {
    customElements.define('card-consulta', CardConsulta);
}