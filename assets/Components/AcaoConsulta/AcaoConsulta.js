export class CaixaAcaoConsulta extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <link rel="stylesheet" href="AcaoConsulta.css">
            
            <div class="caixa-escolha-container">
                
                <div class="radio-group">
                    <label class="radio-label">
                        <input type="radio" name="tipo_acao" value="cancelar" checked>
                        Cancelar
                    </label>
                    <label class="radio-label">
                        <input type="radio" name="tipo_acao" value="remarcar">
                        Remarcar
                    </label>
                </div>

                <div class="campos-dinamicos">
                    <campo-select
                        tamanho-campo-select="50%"
                        titulo-form="Escolha a consulta"
                        id-campo="consulta-alvo"
                        legenda="..."
                        opcoes="Cardiologia - 25/03, Dermatologia - 12/04, Ortopedia - 05/05">
                    </campo-select>

                    <campo-form
                        id="componente-motivo"
                        titulo-form="Diga o motivo do cancelamento"
                        id-campo="motivo-texto"
                        tipo="textarea"
                        legenda=""
                        altura-campo="150px">
                    </campo-form>
                </div>

            </div>
        `;

        // Lógica de Interatividade Corrigida
        const radios = this.querySelectorAll('input[name="tipo_acao"]');
        
        // Agora nós buscamos o COMPONENTE inteiro, e não apenas o textarea
        const componenteMotivo = this.querySelector('#componente-motivo');

        radios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                
                // Agora ele acha a label perfeitamente!
                const labelMotivo = componenteMotivo.querySelector('label');

                if (e.target.value === 'cancelar') {
                    labelMotivo.textContent = 'Diga o motivo do cancelamento';
                } else if (e.target.value === 'remarcar') {
                    labelMotivo.textContent = 'Diga o motivo da remarcação';
                }
                
            });
        });
    }
}

customElements.define('caixa-acao-consulta', CaixaAcaoConsulta);