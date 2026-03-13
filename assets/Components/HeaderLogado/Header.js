export class MeuHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <link rel="stylesheet" href="MeuHeader.css">

            <nav class="navbar navbar-expand-lg bg-white sticky-top">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                        <div class="navbar-nav align-items-center gap-5">
                            <a class="navbar-brand m-0" href="../../../index.html">
                                <img src="/assets/Images/logo-care-plus.png" alt="Logo Care Plus" height="80">
                            </a>
                            <a class="nav-link text-dark" href="../../../index.html">INÍCIO</a>
                            <a class="nav-link text-dark" href="#">AGENDAMENTOS</a>
                            <a class="nav-link text-dark" href="#">GAME PLUS +</a>
                            <a class="nav-link text-dark" href="#">UNIDADES</a>
                            <a class="nav-link text-dark" href="#">CONTATO</a>
                            <a class="btn-perfil-sair" href="../../Pages/EditarPerfil/EditarPerfil.html">
                                <span class="texto-sair">SAIR</span>
                                <div class="circulo-azul">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" >
                                        <path fill="white"
                                            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
}

// Avisa ao navegador que a tag <meu-header> agora existe
customElements.define('meu-header', MeuHeader);