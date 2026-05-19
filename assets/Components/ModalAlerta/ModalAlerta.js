class ModalAlerta extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="modal fade" id="modalAlertaCustom" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content text-center p-4 shadow-lg" style="border-radius: 24px; border: none;">
                        <div class="modal-body">
                            <img src="../../Images/logo-care-plus.png" alt="Care Plus Family" style="height: 55px;" class="mb-4">
                            
                            <h3 id="alerta-titulo" class="fw-bold mb-3" style="color: #212529;">Título</h3>
                            
                            <p id="alerta-texto" class="text-secondary mb-4 px-2" style="font-size: 1.4rem; line-height: 1.5; font-weight: 500;">Mensagem</p>
                            
                            <button type="button" class="btn text-white rounded-pill px-5 py-2 fw-bold" style="background-color: #29b6f6; border: none; letter-spacing: 0.5px; font-size: 1.1rem;" data-bs-dismiss="modal">
                                Entendi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    disparar(titulo, texto) {
        document.getElementById('alerta-titulo').innerText = titulo;
        document.getElementById('alerta-texto').innerText = texto;
        
        const modalWin = new bootstrap.Modal(document.getElementById('modalAlertaCustom'));
        modalWin.show();
    }
}

customElements.define('modal-alerta', ModalAlerta);