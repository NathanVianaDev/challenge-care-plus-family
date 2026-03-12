export class CampoSelect extends HTMLElement {
    connectedCallback() {
        const tituloForm = this.getAttribute('titulo-form') || '';
        const idCampo = this.getAttribute('id-campo') || '';
        const legenda = this.getAttribute('legenda') || 'Selecione...';
        
        const opcoesString = this.getAttribute('opcoes') || '';
        
        // Transforma a string "SP, RJ, MG" em uma lista de verdade
        const listaOpcoes = opcoesString.split(',').map(opcao => opcao.trim());

        // Começa a montar o HTML das opções (a primeira fica desabilitada como legenda)
        let opcoesHtml = `<option value="" disabled selected>${legenda}</option>`;
        
        // Faz um loop (repetição) para criar cada opção que você digitou
        listaOpcoes.forEach(opcao => {
            if (opcao !== "") {
                // O value fica igual ao nome, facilitando na hora de salvar no banco de dados
                opcoesHtml += `<option value="${opcao}">${opcao}</option>`;
            }
        });

        // Desenha o componente
        this.innerHTML = `
            <div class="campo-formulario" style="width: 100%;">
                <label>${tituloForm}</label>
                <select id="${idCampo}">
                    ${opcoesHtml}
                </select>
            </div>
        `;
    }
}

// Avisa ao navegador que a tag <campo-select> agora existe
customElements.define('campo-select', CampoSelect);