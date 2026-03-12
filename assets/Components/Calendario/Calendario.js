// Arquivo: CalendarioDinamico.js

export class CalendarioDinamico extends HTMLElement {
    connectedCallback() {
        const larguraCalendario = this.getAttribute('larguraCalendario') || '100%';
        const alturaCalendario = this.getAttribute('alturaCalendario') || 'auto';
        const legendaCalendario = this.getAttribute('legendaCalendario') || '';
        const tituloExternoCalendario = this.getAttribute('tituloExternoCalendario') || 'Escolha uma data:';

        // Configurações de data e meses
        this.dataHoje = new Date();
        this.mesVisivel = this.dataHoje.getMonth();
        this.anoVisivel = this.dataHoje.getFullYear();
        this.nomesMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

        // Montagem do HTML
        this.innerHTML = `
            <link rel="stylesheet" href="Calendario.css">
            <div class="calendario-wrapper-externo" style="width: ${larguraCalendario}; height: ${alturaCalendario};">
                
                <div class="titulo-externo-calendario">${tituloExternoCalendario}</div>

                <div id="calendario-area">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="fw-bold m-0 titulo-mes"></h5>
                        <div class="btn-group">
                            <button type="button" class="btn border-0 btn-mes-anterior seta-mes">&lt;</button>
                            <button type="button" class="btn border-0 btn-mes-proximo seta-mes">&gt;</button>
                        </div>
                    </div>

                    <table class="table table-borderless text-center m-0" id="tabela-calendario">
                        <thead>
                            <tr class="text-muted">
                                <th>D</th><th>S</th><th>T</th><th>Q</th><th>Q</th><th>S</th><th>S</th>
                            </tr>
                        </thead>
                        <tbody class="corpo-calendario"></tbody>
                    </table>
                    
                    ${legendaCalendario ? `<div class="legenda-calendario">${legendaCalendario}</div>` : ''}
                </div>
            </div>
        `;

        // Capturando os elementos criados
        this.corpoCalendario = this.querySelector('.corpo-calendario');
        this.tituloMes = this.querySelector('.titulo-mes');
        const btnAnterior = this.querySelector('.btn-mes-anterior');
        const btnProximo = this.querySelector('.btn-mes-proximo');

        // Eventos de clique nas setas (com prevenção de recarregamento da tela)
        btnAnterior.addEventListener('click', (e) => {
            e.preventDefault();
            this.mudarMes(-1);
        });
        
        btnProximo.addEventListener('click', (e) => {
            e.preventDefault();
            this.mudarMes(1);
        });

        // Desenha o calendário pela primeira vez
        this.renderizarCalendario();
    }

    // Função que calcula a mudança de mês/ano
    mudarMes(direcao) {
        this.mesVisivel += direcao;
        if (this.mesVisivel < 0) {
            this.mesVisivel = 11;
            this.anoVisivel--;
        } else if (this.mesVisivel > 11) {
            this.mesVisivel = 0;
            this.anoVisivel++;
        }
        this.renderizarCalendario();
    }

    // Função que injeta os dias na tabela
    renderizarCalendario() {
        this.tituloMes.textContent = `${this.nomesMeses[this.mesVisivel]} ${this.anoVisivel}`;

        const primeiroDia = new Date(this.anoVisivel, this.mesVisivel, 1).getDay();
        const diasNoMes = new Date(this.anoVisivel, this.mesVisivel + 1, 0).getDate();
        const diasMesAnterior = new Date(this.anoVisivel, this.mesVisivel, 0).getDate();

        let htmlLinhas = '';
        let diaContador = 1;
        let diaProximoMes = 1;

        for (let linha = 0; linha < 6; linha++) {
            let htmlSemana = '<tr>';

            for (let diaSemana = 0; diaSemana < 7; diaSemana++) {
                if (linha === 0 && diaSemana < primeiroDia) {
                    htmlSemana += `<td class="dia-inativo"><span class="dia-numero">${diasMesAnterior - (primeiroDia - 1 - diaSemana)}</span></td>`;
                } else if (diaContador <= diasNoMes) {
                    let classesCss = '';

                    // Lógica de cores (passado, presente, futuro)
                    if (this.anoVisivel === this.dataHoje.getFullYear() && this.mesVisivel === this.dataHoje.getMonth()) {
                        if (diaContador === this.dataHoje.getDate()) classesCss = 'dia-atual';
                        else if (diaContador < this.dataHoje.getDate()) classesCss = 'dia-passado';
                        else classesCss = 'dia-futuro';
                    } else if (this.anoVisivel < this.dataHoje.getFullYear() || (this.anoVisivel === this.dataHoje.getFullYear() && this.mesVisivel < this.dataHoje.getMonth())) {
                        classesCss = 'dia-passado';
                    } else {
                        classesCss = 'dia-futuro';
                    }

                    htmlSemana += `<td class="${classesCss}"><span class="dia-numero">${diaContador}</span></td>`;
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
    }
}

// Registra o componente final no navegador
customElements.define('calendario-dinamico', CalendarioDinamico);