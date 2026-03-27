class AvatarCenario extends HTMLElement {
    connectedCallback() {
        // 1. Renderiza o HTML do Componente
        this.innerHTML = `
            <div class="position-relative d-inline-block shadow-lg rounded-4 overflow-hidden border border-5 border-white">
                <img src="/assets/Images/fundo-avatar06.jpg" id="img-avatar-bg" class="img-fluid" style="max-height: 550px;">
                
                <div class="dropdown">
                    <button class="btn btn-editar-lateral dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        EDITAR
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end shadow"> 
                        <li><a class="dropdown-item mudar-cenario" href="#" data-bg="fundo-avatar01.png">Cenário 01</a></li>
                        <li><a class="dropdown-item mudar-cenario" href="#" data-bg="fundo-avatar02.png">Cenário 02</a></li>
                        <li><a class="dropdown-item mudar-cenario" href="#" data-bg="fundo-avatar03.jpg">Cenário 03</a></li>
                        <li><a class="dropdown-item mudar-cenario" href="#" data-bg="fundo-avatar04.jpg">Cenário 04</a></li>
                        <li><a class="dropdown-item mudar-cenario" href="#" data-bg="fundo-avatar05.jpg">Cenário 05</a></li>
                        <li><a class="dropdown-item mudar-cenario" href="#" data-bg="fundo-avatar06.jpg">Cenário 06</a></li>
                    </ul>
                </div>
            </div>
        `;

        // 2. Lógica para mudar o fundo (Substitui o antigo mudarFundo do ranking.js)
        this.configurarTrocaDeFundo();
    }

    configurarTrocaDeFundo() {
        const botoesCenario = this.querySelectorAll('.mudar-cenario');
        const imgAvatar = this.querySelector('#img-avatar-bg');

        botoesCenario.forEach(botao => {
            botao.addEventListener('click', (evento) => {
                evento.preventDefault(); // Evita que a página pule para o topo ao clicar no link
                const novoFundo = botao.getAttribute('data-bg');
                
                if (imgAvatar && novoFundo) {
                    imgAvatar.src = `/assets/Images/${novoFundo}`;
                    console.log("Fundo alterado para:", novoFundo);
                }
            });
        });
    }
}

customElements.define('avatar-cenario', AvatarCenario);