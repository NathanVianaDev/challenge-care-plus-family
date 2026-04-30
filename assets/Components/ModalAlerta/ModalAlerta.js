// assets/Components/ModalAlerta/ModalAlerta.js

class ModalAlerta extends HTMLElement {
    connectedCallback() {
        // Estrutura HTML do modal baseada no Bootstrap (já importado no projeto)
        this.innerHTML = `
            <div class="modal fade" id="modalAlertaCustom" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content text-center p-4 shadow-lg" style="border-radius: 24px; border: none;">
                        <div class="modal-body">
                            <!-- Substitua o src pelo caminho real da logo da Care Plus -->
                            <img src="../../Images/logo-care-plus.png" alt="Care Plus Family" style="height: 55px;" class="mb-4">
                            
                            <h4 id="alerta-titulo" class="fw-bold mb-3" style="color: #212529;">Título</h4>
                            <p id="alerta-texto" class="text-muted mb-4 px-2" style="font-size: 0.95rem;">Mensagem</p>
                            
                            <button type="button" class="btn text-white rounded-pill px-5 py-2 fw-bold" style="background-color: #29b6f6; border: none; letter-spacing: 0.5px;" data-bs-dismiss="modal">
                                Entendi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Método que será chamado via JavaScript para exibir o modal
    disparar(titulo, texto) {
        document.getElementById('alerta-titulo').innerText = titulo;
        document.getElementById('alerta-texto').innerText = texto;
        
        // Inicializa e exibe o modal usando a API do Bootstrap
        const modalWin = new bootstrap.Modal(document.getElementById('modalAlertaCustom'));
        modalWin.show();
    }
}

customElements.define('modal-alerta', ModalAlerta);
