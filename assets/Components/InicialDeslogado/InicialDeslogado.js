// Exporta a classe HeaderDeslogado, permitindo que ela seja importada em outros arquivos (como feito no seu HTML com type="module").
// A classe estende HTMLElement, o que significa que estamos criando um novo elemento HTML customizado (Web Component).
export class HeaderDeslogado extends HTMLElement {
    // O método connectedCallback é chamado automaticamente pelo navegador assim que o componente é inserido na tela (DOM).
    connectedCallback() {
        // Define o conteúdo HTML interno (innerHTML) deste componente. 
        // Tudo aqui dentro será renderizado onde a tag <header-deslogado> for colocada no HTML principal.
        this.innerHTML = `
            <!-- Barra de navegação usando classes do Bootstrap (navbar). 'sticky-top' faz o cabeçalho "grudar" no topo ao rolar a página para baixo. -->
            <nav class="navbar navbar-expand-lg bg-white sticky-top" style="border-bottom: 4px solid #3aadde; padding: 12px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
                <div class="container-fluid px-4 px-lg-5 d-flex justify-content-between align-items-center">
                    
                    <!-- Logo da Care Plus. Clicar nela leva para a página inicial (/index.html) -->
                    <a class="navbar-brand m-0" href="/index.html">
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

// Verifica se o elemento customizado 'header-deslogado' já foi registrado no navegador.
// Esse bloqueio de segurança evita erros no console caso este script seja importado acidentalmente mais de uma vez.
if (!customElements.get('header-deslogado')) {
    // Ensina ao navegador que a tag HTML <header-deslogado> deve usar o comportamento e visual da classe HeaderDeslogado criada acima.
    customElements.define('header-deslogado', HeaderDeslogado);
}