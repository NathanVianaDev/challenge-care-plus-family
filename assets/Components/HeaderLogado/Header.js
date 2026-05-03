export class MeuHeader extends HTMLElement {
    connectedCallback() {
        const caminhoHeaderCSS = new URL('./Header.css', import.meta.url).href;

        this.innerHTML = `
            <link rel="stylesheet" href="${caminhoHeaderCSS}">

            <nav class="navbar navbar-expand-lg bg-white sticky-top navbar-logado-custom">
                <div class="container-fluid px-4 px-lg-5">
                    <a class="navbar-brand m-0 d-lg-none" href="/assets/Pages/HomePageLogado/HomePageLogado.html">
                        <img src="/assets/Images/logo-care-plus.png" alt="Logo Care Plus" height="60" onerror="this.style.display='none';">
                    </a>

                    <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                        <div class="navbar-nav align-items-center gap-3 gap-lg-4">
                        
                            <!-- Logo Desktop (Aparece dentro do menu no computador) -->
                            <a class="navbar-brand m-0 d-none d-lg-block" href="/assets/Pages/HomePageLogado/HomePageLogado.html">
                                <img src="/assets/Images/logo-care-plus.png" alt="Logo Care Plus" height="80" onerror="this.style.display='none';">
                            </a>
                            
                            <a class="nav-link" href="/assets/Pages/Ranking/Ranking.html">GAME PLUS +</a>
                            <a class="nav-link" href="/assets/Pages/AmbienteFamilia/AmbienteFamilia.html">FAMÍLIA</a>
                            <a class="nav-link" href="/assets/Pages/EditarPerfil/EditarPerfil.html">PERFIL</a>
                            
                            <!-- Botão SAIR encapsulado para poder centralizar no Mobile -->
                            <div class="container-btn-sair d-flex ms-lg-2">
                                <a href="/Index.html" class="btn-perfil-sair" >
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
                </div>
            </nav>
        `;
    }
}

// Avisa ao navegador que a tag <meu-header> agora existe
customElements.define('meu-header', MeuHeader);