// Arquivo: CookieBanner.js

export class CookieBanner extends HTMLElement {
    connectedCallback() {
        // Verifica se o usuário já aceitou os cookies anteriormente
        const cookiesAceitos = localStorage.getItem('careplus_cookies_accepted');
        

        if (!cookiesAceitos) {
            this.render();
        }
    }

    render() {
        
        const caminhoCookieCSS = new URL('./CookieBanner.css', import.meta.url).href;
        
        this.innerHTML = `
            <link rel="stylesheet" href="${caminhoCookieCSS}">
            <div class="cookie-wrapper" id="cookie-banner">
                <div class="cookie-card">
                    <p class="cookie-text">
                        Utilizamos cookies para oferecer uma melhor experiência, melhorar o desempenho e analisar como você interage em nosso site. 
                        Ao utilizar este site, você concorda com o uso de cookies e nossa 
                        <a href="./politica-privacidade.html">Política de Privacidade</a>.
                    </p>
                    <div class="cookie-btns">
                        <button class="btn-cookie-decline" id="btn-cookie-decline">Recusar</button>
                        <button class="btn-cookie-accept" id="btn-cookie-accept">Aceitar Cookies</button>
                    </div>
                </div>
            </div>
        `;

        // Mostra o banner com um pequeno delay para efeito visual
        const banner = this.querySelector('#cookie-banner');
        setTimeout(() => {
            banner.style.display = 'block';
        }, 1000);

        // Lógica dos botões
        this.querySelector('#btn-cookie-accept').addEventListener('click', () => {
            this.salvarEscolha(banner);
        });

        this.querySelector('#btn-cookie-decline').addEventListener('click', () => {
            // Mesmo recusando, escondemos o banner para não atrapalhar a navegação atual
            banner.style.display = 'none';
        });
    }

    salvarEscolha(banner) {
        // Salva no navegador que o usuário já aceitou
        localStorage.setItem('careplus_cookies_accepted', 'true');
        
        // Esconde o banner
        banner.style.display = 'none';
        
        console.log("Cookies aceitos e preferência salva.");
    }
}

customElements.define('cookie-banner', CookieBanner);