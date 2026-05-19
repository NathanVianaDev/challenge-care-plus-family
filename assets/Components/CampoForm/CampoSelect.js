export class CampoSelect extends HTMLElement {
    connectedCallback() {
        const tituloForm = this.getAttribute('titulo-form') || '';
        const idCampo = this.getAttribute('id-campo') || '';
        const legenda = this.getAttribute('legenda') || '';
        const tamanhoCampoSelect = this.getAttribute('tamanho-campo-select') || '100%';
        
        const opcoesString = this.getAttribute('opcoes') || '';
        
        const listaOpcoes = opcoesString.split(',').map(opcao => opcao.trim());

        let opcoesHtml = `<option value="" disabled selected>${legenda}</option>`;
        
        listaOpcoes.forEach(opcao => {
            if (opcao !== "") {
                opcoesHtml += `<option value="${opcao}">${opcao}</option>`;
            }
        });

        this.innerHTML = `
            <div class="campo-formulario" style="width: ${tamanhoCampoSelect};">
                <label>${tituloForm}</label>
                <select class="form-select" id="${idCampo}">
                    ${opcoesHtml}
                </select>
            </div>
        `;
    }
}

customElements.define('campo-select', CampoSelect);