export class CampoForm extends HTMLElement {
    
    connectedCallback() {
        const tamanhoCampo = this.getAttribute('tamanho-campo') || '100%';
        const alturaCampo = this.getAttribute('altura-campo') || 'auto';
        const tituloForm = this.getAttribute('titulo-form') || '';
        const idCampo = this.getAttribute('id-campo') || '';
        const tipo = this.getAttribute('tipo') || 'text';
        const legenda = this.getAttribute('legenda') || '';

        // Desenhando o HTML interno do nosso componente
        this.innerHTML = `
            <div class="campo-formulario" style="width: ${tamanhoCampo}; height: ${alturaCampo};">
                <label>${tituloForm}</label>
                <input id="${idCampo}" type="${tipo}" placeholder="${legenda}">
            </div>
        `;
    }
}

// Ensinamos ao navegador que a tag <campo-form> existe e deve usar a lógica acima
customElements.define('campo-form', CampoForm);