export class NavbarDeslogado extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="navbar navbar-expand-lg sticky-top navbar-deslogado-custom">
                <div class="container-fluid px-4 px-lg-5">
                    
                    <a class="navbar-brand m-0 d-lg-none" href="/Pages/HomePage/HomePage.html">
                        <img src="/assets/Images/logo-care-plus.png" alt="Logo Care Plus" height="60" onerror="this.style.display='none';">
                    </a>

                    <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#menuDeslogado">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse justify-content-center" id="menuDeslogado">
                        
                        <div class="navbar-nav align-items-center gap-3 gap-lg-4">
                            
                            <a class="navbar-brand m-0 d-none d-lg-block" href="/assets/Pages/HomePage/HomePage.html">
                                <img src="/assets/Images/logo-care-plus.png" alt="Logo Care Plus" height="80" onerror="this.style.display='none';">
                            </a>

                            <a class="nav-link" href="/assets/Pages/HomePage/HomePage.html">INÍCIO</a>
                            <a class="nav-link" href="/assets/Pages/Odontologia/Odontologia.html">ODONTOLOGIA</a>
                            <a class="nav-link" href="/assets/Pages/Dermatologia/Dermatologia.html">DERMATOLOGIA</a>
                            <a class="nav-link" href="/assets/Pages/GamePlus/GamePlus.html">GAME PLUS +</a>
                            <a class="nav-link" href="/assets/Pages/Unidades/Unidades.html">UNIDADES</a>
                            <a class="nav-link" href="/assets/Pages/Contatos/Contatos.html">CONTATO</a>
                            
                            <a class="btn-login ms-lg-2" href="/assets/Pages/Login/Login.html">
                                <span class="texto-login">LOGIN</span>
                                <div class="circulo-azul-login">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="white" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
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

if (!customElements.get('navbar-deslogado')) {
    customElements.define('navbar-deslogado', NavbarDeslogado);
}