/**
 * CadastrarFuncionario - Care Plus Family
 * Componente para exibir a linha de dados de um colaborador com opção de exclusão e modal de confirmação.
 */

const CSS_URL = '../../Components/CadastrarFuncionario/CadastrarFuncionario.css';

class CadastrarFuncionario extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['nome', 'admissao', 'idade', 'status'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const nome = this.getAttribute('nome') || 'Funcionário';
        const admissao = this.getAttribute('admissao') || '--/--/----';
        const idade = this.getAttribute('idade') || '--';
        const status = this.getAttribute('status') === 'ativo';

        const statusIcon = status ? 'bi-check-circle-fill' : 'bi-x-circle-fill';
        const statusClass = status ? 'status-ativo' : 'status-inativo';
        
        const statusText = status 
            ? '<span>Plano</span> Ativo' 
            : '<span>Plano</span> Inativo';

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
            <link rel="stylesheet" href="${CSS_URL}">
            
            <div class="funcionario-card">
                <div class="info-principal">
                    <div class="avatar-mini">
                        <i class="bi bi-person-badge"></i>
                    </div>
                    <div class="dados">
                        <span class="nome">${nome}</span>
                        <span class="detalhe">Admissão: ${admissao}</span>
                    </div>
                </div>

                <div class="info-secundaria">
                    <div class="idade-box">
                        <span class="label">Idade</span>
                        <span class="valor">${idade} anos</span>
                    </div>
                    
                    <div class="status-box ${statusClass}">
                        <i class="bi ${statusIcon}"></i>
                        <span class="texto-status">${statusText}</span>
                    </div>

                    <button type="button" class="btn-excluir" title="Excluir funcionário">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </div>

            <div class="modal-overlay" id="modalConfirmacao">
                <div class="modal-content">
                    <i class="bi bi-exclamation-triangle text-danger icone-alerta"></i>
                    <h4 class="modal-titulo">Excluir Funcionário?</h4>
                    <p class="modal-texto">Tem certeza que deseja remover <strong>${nome}</strong> do quadro de colaboradores? Esta ação não pode ser desfeita.</p>
                    <div class="modal-acoes">
                        <button type="button" class="btn-modal btn-cancelar">Cancelar</button>
                        <button type="button" class="btn-modal btn-confirmar">Sim, Excluir</button>
                    </div>
                </div>
            </div>
        `;

        this.configurarEventos();
    }

    configurarEventos() {
        const btnExcluir = this.shadowRoot.querySelector('.btn-excluir');
        const btnCancelar = this.shadowRoot.querySelector('.btn-cancelar');
        const btnConfirmar = this.shadowRoot.querySelector('.btn-confirmar');
        const modalOverlay = this.shadowRoot.querySelector('#modalConfirmacao');

        // Abrir Modal
        btnExcluir.addEventListener('click', () => {
            modalOverlay.classList.add('active');
        });

        // Fechar Modal (Botão Cancelar)
        btnCancelar.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });

        // Fechar Modal clicando fora dele
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });

        // Confirmar Exclusão
        btnConfirmar.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            this.excluir();
        });
    }

    excluir() {
        // Envia o nome e a própria referência do elemento a ser deletado
        const eventoExcluir = new CustomEvent('deletar-funcionario', {
            detail: { 
                nome: this.getAttribute('nome'),
                element: this 
            },
            bubbles: true,   // Permite que o evento suba na árvore DOM
            composed: true   // Permite que o evento atravesse a barreira do Shadow DOM
        });
        this.dispatchEvent(eventoExcluir);
    }
}

if (!customElements.get('cadastrar-funcionario')) {
    customElements.define('cadastrar-funcionario', CadastrarFuncionario);
}