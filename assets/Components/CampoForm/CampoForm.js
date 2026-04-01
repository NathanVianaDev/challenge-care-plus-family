// Arquivo: CampoForm.js

export class CampoForm extends HTMLElement {
    connectedCallback() {
        const tamanhoCampo = this.getAttribute('tamanho-campo') || '100%';
        const alturaCampo = this.getAttribute('altura-campo') || 'auto';
        const tituloForm = this.getAttribute('titulo-form') || '';
        const idCampo = this.getAttribute('id-campo') || '';
        const tipo = this.getAttribute('tipo') || 'text';
        const legenda = this.getAttribute('legenda') || '';

        // Variável que vai guardar a tag correta
        let campoHtml = '';

        // Se o tipo for textarea, usamos a tag de texto longo (que começa do topo)
        if (tipo === 'textarea') {
            campoHtml = `<textarea id="${idCampo}" placeholder="${legenda}"></textarea>`;
        } 
        // Se for qualquer outra coisa (text, email, password), usamos o input normal
        else {
            campoHtml = `<input id="${idCampo}" type="${tipo}" placeholder="${legenda}">`;
        }

        // Desenhando o componente na tela
        this.innerHTML = `
            <div class="campo-formulario" style="width: ${tamanhoCampo}; height: ${alturaCampo}; display: flex; flex-direction: column;">
                <label>${tituloForm}</label>
                ${campoHtml}
            </div>
        `;
    }
}

customElements.define('campo-form', CampoForm);