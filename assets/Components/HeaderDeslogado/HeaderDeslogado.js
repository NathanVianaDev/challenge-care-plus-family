export class HeaderDeslogado extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                .navbar-custom { border-bottom: 4px solid #3aadde; }
                
                .btn-entrar {
                    background-color: #92C444 !important; 
                    border-radius: 25px; 
                    padding: 4px 4px 4px 20px; 
                    transition: 0.3s;
                    text-decoration: none;
                    display: inline-flex;
                }
                
                .btn-entrar:hover {
                    background-color: #7da83a !important;
                    transform: scale(1.02);
                }

                /* Ajustes para Responsividade (Mobile) */
                @media (max-width: 991px) {
                    .navbar-collapse {
                        background-color: #f8f9fa;
                        padding: 15px;
                        border-radius: 8px;
                        margin-top: 10px;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                    }
                    
                    .nav-item {
                        border-bottom: 1px solid #eaeaea;
                        padding: 5px 0;
                        text-align: center; /* Centraliza o texto também no mobile */
                    }

                    .container-btn-entrar {
                        margin-top: 15px;
                        justify-content: center !important; /* Centraliza o botão no mobile */
                    }
                }
            </style>

            <nav class="navbar navbar-expand-lg bg-white sticky-top shadow-sm navbar-custom">
                <div class="container-fluid px-4 px-lg-5">
                    
                    <a class="navbar-brand m-0" href="/index.html">
                        <img src="/assets/Images/logo-care-plus.png" alt="Logo Care Plus" height="60" onerror="this.style.display='none';">
                    </a>

                    <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="menuPrincipal">
                        
                        <ul class="navbar-nav mx-auto gap-3 font-weight-bold" style="font-size: 0.85rem;">
                            <li class="nav-item"><a class="nav-link text-dark fw-bold" href="/index.html">INÍCIO</a></li>
                            <li class="nav-item"><a class="nav-link text-dark fw-bold" href="#">ODONTOLOGIA</a></li>
                            <li class="nav-item"><a class="nav-link text-dark fw-bold" href="#">DERMATOLOGIA</a></li>
                            <li class="nav-item"><a class="nav-link text-dark fw-bold" href="#">GAME PLUS +</a></li>
                            <li class="nav-item"><a class="nav-link text-dark fw-bold" href="#">UNIDADES</a></li>
                            <li class="nav-item"><a class="nav-link text-dark fw-bold" href="#">CONTATO</a></li>
                        </ul>
                        
                        <div class="d-flex align-items-center container-btn-entrar">
                            <a class="align-items-center btn-entrar" href="/assets/Pages/Login/Base.html">
                                <span class="text-white fw-bold me-3" style="font-size: 0.85rem;">ENTRAR</span>
                                <div class="d-flex justify-content-center align-items-center" style="background-color: #3aadde; width: 35px; height: 35px; border-radius: 50%;">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 16px; fill: white;">
                                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
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

if (!customElements.get('header-deslogado')) {
    customElements.define('header-deslogado', HeaderDeslogado);
}