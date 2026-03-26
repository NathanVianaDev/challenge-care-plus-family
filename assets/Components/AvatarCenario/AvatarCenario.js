// assets/Components/AvatarCenario/AvatarCenario.js

class AvatarCenario extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="position-relative d-inline-block shadow-lg rounded-4 overflow-hidden border border-5 border-white">
                <img src="/assets/Images/fundo-avatar01.png" id="img-avatar-bg" class="img-fluid" style="max-height: 550px;">
                
                <div class="dropdown">
                    <button class="btn btn-editar-lateral dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        EDITAR
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end shadow"> 
                        <li><a class="dropdown-item" href="#" onclick="document.getElementById('img-avatar-bg').src='/assets/Images/fundo-avatar01.png'">Cenário 01</a></li>
                        <li><a class="dropdown-item" href="#" onclick="document.getElementById('img-avatar-bg').src='/assets/Images/fundo-avatar02.png'">Cenário 02</a></li>
                    </ul>
                </div>
            </div>
        `;
    }
}

customElements.define('avatar-cenario', AvatarCenario);