/**
 * CadastrarFuncionario - Care Plus Family
 * Componente para exibir a linha de dados de um colaborador com opção de exclusão.
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
        `;

        // Vincula o evento de clique ao botão existente no Shadow DOM
        this.shadowRoot.querySelector('.btn-excluir').addEventListener('click', () => {
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