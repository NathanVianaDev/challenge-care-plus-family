class AvatarCenario extends HTMLElement {
    connectedCallback() {
        // 1. Lê a pasta passada no HTML
        const pasta = this.getAttribute('diretorio-imagens') || '';
        const caminhoBase = pasta ? `/assets/Images/${pasta}` : '/assets/Images';

        // 2. Variáveis para guardar as imagens e os textos corretos
        let listaImagens = [];
        let prefixoTexto = "Cenário";

        // 3. A MÁGICA CORRIGIDA
        if (pasta === 'FamiliaCarplus') {
            prefixoTexto = "Família";
            listaImagens = [
                'Familia-CarPlus01.png',
                'Familia-CarPlus02.png',
                'Familia-CarPlus03.png',
                'Familia-CarPlus04.png',
                'Familia-CarPlus05.png'
            ];
        } else if (pasta === 'AmbienteEmpresa') {
            prefixoTexto = "Ambiente Empresa";
            listaImagens = [
                'AmbienteEmpresa.png'
            ];
        } else {
            // Padrão (FundoAvatar)
            prefixoTexto = "Cenário";
            listaImagens = [
                'fundo-avatar01.png',
                'fundo-avatar02.png',
                'fundo-avatar03.jpg',
                'fundo-avatar04.jpg',
                'fundo-avatar05.jpg',
                'fundo-avatar06.jpg'
            ];
        }

        // 4. Monta o HTML do menu dropdown (os <li>) dinamicamente
        let menuItensHTML = '';
        listaImagens.forEach((img, index) => {
            let numeroCenario = String(index + 1).padStart(2, '0');
            menuItensHTML += `<li><a class="dropdown-item mudar-cenario" href="#" data-bg="${img}">${prefixoTexto} ${numeroCenario}</a></li>`;
        });

        // 5. Renderiza o Componente
        this.innerHTML = `
            <div class="position-relative d-inline-block shadow-lg rounded-4 overflow-hidden border border-5 border-white">
                
                <img src="${caminhoBase}/${listaImagens[0]}" id="img-avatar-bg" class="img-fluid" style="max-height: 550px;">
                
                <div class="dropdown">
                    <button class="btn btn-editar-lateral dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        EDITAR
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end shadow"> 
                        ${menuItensHTML}
                    </ul>
                </div>
            </div>
        `;

        // Ativa a lógica de trocar a foto ao clicar no menu
        this.configurarTrocaDeFundo(caminhoBase);
    }

    configurarTrocaDeFundo(caminhoBase) {
        const botoesCenario = this.querySelectorAll('.mudar-cenario');
        const imgAvatar = this.querySelector('#img-avatar-bg');

        botoesCenario.forEach(botao => {
            botao.addEventListener('click', (evento) => {
                evento.preventDefault(); 
                const novoFundo = botao.getAttribute('data-bg');
                
                if (imgAvatar && novoFundo) {
                    imgAvatar.src = `${caminhoBase}/${novoFundo}`;
                    console.log("Fundo alterado com sucesso para:", `${caminhoBase}/${novoFundo}`);
                }
            });
        });
    }
}

customElements.define('avatar-cenario', AvatarCenario);