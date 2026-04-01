export class CampoData extends HTMLElement {
    connectedCallback() {
        const tituloFormData = this.getAttribute('titulo-form-data') || '';
        const idCampoData = this.getAttribute('id-campo-data') || '';
        const legendaData = this.getAttribute('legenda-data') || 'DD/MM/AAAA';

        this.dataHoje = new Date();
        this.mesVisivel = this.dataHoje.getMonth();
        this.anoVisivel = this.dataHoje.getFullYear();
        this.nomesMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

        this.innerHTML = `
            <link rel="stylesheet" href="CampoDataCustom.css">
            <div class="campo-data-wrapper">
                <div class="campo-formulario">
                    <label>${tituloFormData}</label>
                    <input type="text" id="${idCampoData}" class="input-data-custom" placeholder="${legendaData}" readonly>
                </div>

                <div class="calendario-popup">
                    <div class="d-flex-header">
                        <p class="titulo-mes-popup"></p>
                        <div>
                            <button type="button" class="seta-mes btn-anterior">&lt;</button>
                            <button type="button" class="seta-mes btn-proximo">&gt;</button>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr><th>D</th><th>S</th><th>T</th><th>Q</th><th>Q</th><th>S</th><th>S</th></tr>
                        </thead>
                        <tbody class="corpo-calendario-popup"></tbody>
                    </table>
                </div>
            </div>
        `;

        this.inputCampo = this.querySelector('.input-data-custom');
        this.popup = this.querySelector('.calendario-popup');
        this.corpoCalendario = this.querySelector('.corpo-calendario-popup');
        this.tituloMes = this.querySelector('.titulo-mes-popup');
        
        // Abrir/Fechar o calendário ao clicar no input
        this.inputCampo.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que o clique feche imediatamente
            this.popup.classList.toggle('ativo');
            this.renderizarCalendario();
        });

        // Fechar o calendário ao clicar em qualquer lugar fora dele
        document.addEventListener('click', (e) => {
            if (!this.contains(e.target)) {
                this.popup.classList.remove('ativo');
            }
        });

        // Eventos das setas
        this.querySelector('.btn-anterior').addEventListener('click', (e) => {
            e.preventDefault(); e.stopPropagation(); this.mudarMes(-1);
        });
        this.querySelector('.btn-proximo').addEventListener('click', (e) => {
            e.preventDefault(); e.stopPropagation(); this.mudarMes(1);
        });
    }

    mudarMes(direcao) {
        this.mesVisivel += direcao;
        if (this.mesVisivel < 0) { this.mesVisivel = 11; this.anoVisivel--; } 
        else if (this.mesVisivel > 11) { this.mesVisivel = 0; this.anoVisivel++; }
        this.renderizarCalendario();
    }

    renderizarCalendario() {
        this.tituloMes.textContent = `${this.nomesMeses[this.mesVisivel]} ${this.anoVisivel}`;

        const primeiroDia = new Date(this.anoVisivel, this.mesVisivel, 1).getDay();
        const diasNoMes = new Date(this.anoVisivel, this.mesVisivel + 1, 0).getDate();
        const diasMesAnterior = new Date(this.anoVisivel, this.mesVisivel, 0).getDate();

        let htmlLinhas = '';
        let diaContador = 1; let diaProximoMes = 1;

        for (let linha = 0; linha < 6; linha++) {
            let htmlSemana = '<tr>';
            for (let diaSemana = 0; diaSemana < 7; diaSemana++) {
                if (linha === 0 && diaSemana < primeiroDia) {
                    htmlSemana += `<td class="dia-inativo"><span class="dia-numero">${diasMesAnterior - (primeiroDia - 1 - diaSemana)}</span></td>`;
                } else if (diaContador <= diasNoMes) {
                    let classesCss = '';
                    if (this.anoVisivel === this.dataHoje.getFullYear() && this.mesVisivel === this.dataHoje.getMonth() && diaContador === this.dataHoje.getDate()) {
                        classesCss = 'dia-hoje';
                    }
                    // Adicionamos um data-attribute para o JS saber qual dia foi clicado
                    htmlSemana += `<td class="${classesCss} dia-selecionavel" data-dia="${diaContador}"><span class="dia-numero">${diaContador}</span></td>`;
                    diaContador++;
                } else {
                    htmlSemana += `<td class="dia-inativo"><span class="dia-numero">${diaProximoMes}</span></td>`;
                    diaProximoMes++;
                }
            }
            htmlSemana += '</tr>';
            htmlLinhas += htmlSemana;
        }
        this.corpoCalendario.innerHTML = htmlLinhas;

        // Adiciona a lógica de clique para cada dia válido
        const diasClicaveis = this.querySelectorAll('.dia-selecionavel');
        diasClicaveis.forEach(diaTd => {
            diaTd.addEventListener('click', (e) => {
                e.stopPropagation();
                const diaEscolhido = diaTd.getAttribute('data-dia');
                
                // Formata a data para DD/MM/AAAA
                const diaFormatado = diaEscolhido.padStart(2, '0');
                const mesFormatado = String(this.mesVisivel + 1).padStart(2, '0');
                const dataFinal = `${diaFormatado}/${mesFormatado}/${this.anoVisivel}`;
                
                // Preenche o input e fecha o calendário
                this.inputCampo.value = dataFinal;
                this.popup.classList.remove('ativo');
            });
        });
    }
}

customElements.define('campo-data', CampoData);