// Arquivo: PerfilFormulario.js

export class PerfilFormulario extends HTMLElement {
    connectedCallback() {
        // 1. Guarda todos os campos que você digitou DENTRO da tag lá no HTML
        const camposQueOUserColocou = Array.from(this.children);

        // 2. Você pode até mudar o título da caixa se quiser!
        const titulo = this.getAttribute('titulo-caixa') || 'Meus Dados';

        // 3. Monta a estrutura da caixa principal
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

        // 4. Injeta os seus campos de volta, agora no lugar certo!
        const containerCampos = this.querySelector('#container-campos');
        camposQueOUserColocou.forEach(campo => {
            containerCampos.appendChild(campo);
        });

        // 5. Inicia a lógica de bloqueio
        setTimeout(() => {
            this.iniciarLogica();
        }, 50);
    }

    iniciarLogica() {
        const btnEditar = this.querySelector('#btn-editar');
        const btnSalvar = this.querySelector('#btn-salvar');
        const btnCancelar = this.querySelector('#btn-cancelar');
        const containerBotoes = this.querySelector('#botoes-acao');
        
        // Agora nós pegamos inputs, selects e textareas!
        const campos = this.querySelectorAll('input, select, textarea');
        let valoresOriginais = {};

        // Bloqueia tudo assim que a tela abre
        campos.forEach(campo => {
            campo.disabled = true;
        });

        // Clicou no Lápis
        btnEditar.addEventListener('click', () => {
            campos.forEach((campo, index) => {
                valoresOriginais[index] = campo.value; // Salva o que estava escrito
                campo.disabled = false; // Destrava
            });

            btnEditar.style.display = 'none';
            containerBotoes.style.display = 'flex';
        });

        // Clicou em Cancelar
        btnCancelar.addEventListener('click', () => {
            campos.forEach((campo, index) => {
                campo.value = valoresOriginais[index]; // Devolve o texto antigo
                campo.disabled = true; // Trava de novo
            });

            btnEditar.style.display = 'flex';
            containerBotoes.style.display = 'none';
        });

        // Clicou em Salvar
        btnSalvar.addEventListener('click', () => {
            campos.forEach(campo => {
                campo.disabled = true; // Apenas trava, mantendo o novo texto
            });

            btnEditar.style.display = 'flex';
            containerBotoes.style.display = 'none';
        });
    }
}

customElements.define('perfil-formulario', PerfilFormulario);