export class PerfilFormulario extends HTMLElement {
    connectedCallback() {
        const camposQueOUserColocou = Array.from(this.children);

        const titulo = this.getAttribute('titulo-caixa') || 'Meus Dados';

        this.innerHTML = `
            <link rel="stylesheet" href="PerfilFormulario.css">
            <div class="perfil-container">
                
                <div class="perfil-header">
                    <h4 class="titulo-perfil">${titulo}</h4>
                    <button class="btn-editar" id="btn-editar">
                        <i class="bi bi-pencil-fill"></i> Alterar informações
                    </button>
                </div>

                <div class="perfil-grid" id="container-campos"></div>

                <div class="botoes-acao" id="botoes-acao">
                    <button class="btn-cancelar" id="btn-cancelar">Cancelar</button>
                    <button class="btn-salvar" id="btn-salvar">Salvar</button>
                </div>
            </div>
        `;

        const containerCampos = this.querySelector('#container-campos');
        camposQueOUserColocou.forEach(campo => {
            containerCampos.appendChild(campo);
        });

        setTimeout(() => {
            this.iniciarLogica();
        }, 50);
    }

    iniciarLogica() {
        const btnEditar = this.querySelector('#btn-editar');
        const btnSalvar = this.querySelector('#btn-salvar');
        const btnCancelar = this.querySelector('#btn-cancelar');
        const containerBotoes = this.querySelector('#botoes-acao');
        
        const campos = this.querySelectorAll('input, select, textarea');
        let valoresOriginais = {};

        campos.forEach(campo => {
            campo.disabled = true;
        });

        btnEditar.addEventListener('click', () => {
            campos.forEach((campo, index) => {
                valoresOriginais[index] = campo.value;
                campo.disabled = false; 
            });

            btnEditar.style.display = 'none';
            containerBotoes.style.display = 'flex';
        });

        btnCancelar.addEventListener('click', () => {
            campos.forEach((campo, index) => {
                campo.value = valoresOriginais[index];
                campo.disabled = true; 
            });

            btnEditar.style.display = 'flex';
            containerBotoes.style.display = 'none';
        });

        btnSalvar.addEventListener('click', () => {
            campos.forEach(campo => {
                campo.disabled = true; 
            });

            btnEditar.style.display = 'flex';
            containerBotoes.style.display = 'none';
        });
    }
}

customElements.define('perfil-formulario', PerfilFormulario);