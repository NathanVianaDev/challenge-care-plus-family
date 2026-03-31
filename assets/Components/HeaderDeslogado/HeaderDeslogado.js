// Exporta a classe HeaderDeslogado, permitindo que ela seja importada em outros arquivos (como feito no seu HTML com type="module").
// A classe estende HTMLElement, o que significa que estamos criando um novo elemento HTML customizado (Web Component).
export class HeaderDeslogado extends HTMLElement {
    // O método connectedCallback é chamado automaticamente pelo navegador assim que o componente é inserido na tela (DOM).
    connectedCallback() {
        // Define o conteúdo HTML interno (innerHTML) deste componente. 
        // Tudo aqui dentro será renderizado onde a tag <header-deslogado> for colocada no HTML principal.
        this.innerHTML = `
<<<<<<< HEAD:assets/Components/HeaderDeslogado/HeaderDeslogado.js
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
=======
            <!-- Barra de navegação usando classes do Bootstrap (navbar). 'sticky-top' faz o cabeçalho "grudar" no topo ao rolar a página para baixo. -->
            <nav class="navbar navbar-expand-lg bg-white sticky-top" style="border-bottom: 4px solid #3aadde; padding: 12px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
                <div class="container-fluid px-4 px-lg-5 d-flex justify-content-between align-items-center">
>>>>>>> 0b996f05c1c1c9a0e230f620d79109d1c71ef0ec:assets/Components/InicialDeslogado/InicialDeslogado.js
                    
                    <!-- Logo da Care Plus. Clicar nela leva para a página inicial (/index.html) -->
                    <a class="navbar-brand m-0" href="/index.html">
<<<<<<< HEAD:assets/Components/HeaderDeslogado/HeaderDeslogado.js
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
=======
                        <!-- Se a imagem falhar ao carregar (onerror), ela é ocultada e um texto "CARE PLUS" é exibido no lugar como plano B -->
                        <img src="/assets/Images/logo-care-plus.png" alt="Care Plus Family" height="50" onerror="this.style.display='none'; this.insertAdjacentHTML('afterend', '<span style=\\'font-weight:bold; color:#3aadde; font-family: Montserrat;\\'>CARE PLUS</span>');">
                    </a>

                    <!-- Botão de menu "hambúrguer" que aparece apenas em telas menores (celulares e tablets). -->
                    <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#menuDeslogado">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <!-- Contêiner do menu que será colapsado (escondido) em telas pequenas e revelado ao clicar no botão acima. -->
                    <div class="collapse navbar-collapse" id="menuDeslogado">
                        
                        <!-- Lista de links de navegação. A classe 'mx-auto' centraliza os links horizontalmente na barra. -->
                        <ul class="navbar-nav mx-auto gap-4" style="font-size: 0.85rem; font-family: 'Montserrat', sans-serif;">
                            <li class="nav-item"><a class="nav-link text-dark fw-bold px-0" href="/index.html">INÍCIO</a></li>
                            <li class="nav-item"><a class="nav-link text-dark fw-bold px-0" href="#">ODONTOLOGIA</a></li>
                            <li class="nav-item"><a class="nav-link text-dark fw-bold px-0" href="#">DERMATOLOGIA</a></li>
                            <li class="nav-item"><a class="nav-link text-dark fw-bold px-0" href="#">GAME PLUS +</a></li>
                            <li class="nav-item"><a class="nav-link text-dark fw-bold px-0" href="#">UNIDADES</a></li>
                            <li class="nav-item"><a class="nav-link text-dark fw-bold px-0" href="#">CONTATO</a></li>
                        </ul>
                        
                        <!-- Área do botão de "ENTRAR" (Login), posicionada à direita em telas grandes. -->
                        <div class="d-flex align-items-center mt-3 mt-lg-0">
                            <a class="text-decoration-none d-inline-flex align-items-center" href="/assets/Pages/Login/Base.html" style="background-color: #92C444; border-radius: 50px; padding: 4px 4px 4px 22px; transition: all 0.2s ease-in-out;">
                                <span class="text-white me-3" style="font-size: 0.85rem; font-family: 'Montserrat', sans-serif; font-weight: 700; letter-spacing: 0.3px;">ENTRAR</span>
                                
                                <!-- Ícone de usuário (SVG) dentro de um círculo azul, parte do design do botão de login. -->
                                <div class="d-flex justify-content-center align-items-center" style="background-color: #007bc0; width: 36px; height: 36px; border-radius: 50%;">
>>>>>>> 0b996f05c1c1c9a0e230f620d79109d1c71ef0ec:assets/Components/InicialDeslogado/InicialDeslogado.js
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

<<<<<<< HEAD:assets/Components/HeaderDeslogado/HeaderDeslogado.js
=======
// Verifica se o elemento customizado 'header-deslogado' já foi registrado no navegador.
// Esse bloqueio de segurança evita erros no console caso este script seja importado acidentalmente mais de uma vez.
>>>>>>> 0b996f05c1c1c9a0e230f620d79109d1c71ef0ec:assets/Components/InicialDeslogado/InicialDeslogado.js
if (!customElements.get('header-deslogado')) {
    // Ensina ao navegador que a tag HTML <header-deslogado> deve usar o comportamento e visual da classe HeaderDeslogado criada acima.
    customElements.define('header-deslogado', HeaderDeslogado);
}