export class CookieBanner extends HTMLElement {
    connectedCallback() {
        const cookiesAceitos = localStorage.getItem('careplus_cookies_accepted');

        if (!cookiesAceitos) {
            this.render();
        }
    }

    render() {
        const caminhoCookieCSS = new URL('./CookieBanner.css', import.meta.url).href;

        if (!document.querySelector(`link[href="${caminhoCookieCSS}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = caminhoCookieCSS;
            document.head.appendChild(link);
        }

        this.innerHTML = `
            
            <div class="cookie-wrapper" id="cookie-banner">
                <div class="cookie-card">
                    <p class="cookie-text">
                        Utilizamos cookies para oferecer uma melhor experiência, melhorar o desempenho e analisar como você interage em nosso site. 
                        Ao utilizar este site, você concorda com o uso de cookies e nossa 
                        <button class="link-politica" id="abrir-politica">Política de Privacidade</button>.
                    </p>
                    <div class="cookie-btns">
                        <button class="btn-cookie-decline" id="btn-cookie-decline">Recusar</button>
                        <button class="btn-cookie-accept" id="btn-cookie-accept">Aceitar Cookies</button>
                    </div>
                </div>
            </div>

            <div class="modal-overlay" id="modal-politica">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Política de Privacidade</h3>
                        <button class="btn-fechar-modal" id="fechar-politica">&times;</button>
                    </div>
                    
                    <div class="modal-body">
                        <p><strong>1. Coleta de Dados</strong><br>
                        A Care Plus Family coleta dados fornecidos voluntariamente por você (como nome, CPF, e-mail) durante o cadastro para garantir a prestação adequada dos nossos serviços de saúde e assistência.</p>
                        
                        <p><strong>2. Uso das Informações</strong><br>
                        Suas informações são utilizadas exclusivamente para o agendamento de consultas, autorizações de exames, histórico médico e comunicações importantes sobre o seu plano.</p>

                        <p><strong>3. Compartilhamento e Segurança</strong><br>
                        Nós não vendemos seus dados. Informações sensíveis podem ser compartilhadas com a rede credenciada (hospitais e médicos) apenas quando necessário para o seu atendimento, seguindo rigorosamente as diretrizes da LGPD (Lei Geral de Proteção de Dados).</p>

                        <p><strong>4. Seus Direitos</strong><br>
                        Você tem o direito de solicitar a visualização, alteração ou exclusão dos seus dados a qualquer momento através do seu painel de usuário logado.</p>
                    </div>
                </div>
            </div>
        `;

        const banner = this.querySelector('#cookie-banner');
        const btnAceitar = this.querySelector('#btn-cookie-accept');
        const btnRecusar = this.querySelector('#btn-cookie-decline');
        
        const btnAbrirPolitica = this.querySelector('#abrir-politica');
        const modalPolitica = this.querySelector('#modal-politica');
        const btnFecharPolitica = this.querySelector('#fechar-politica');

        setTimeout(() => {
            banner.style.display = 'block';
        }, 1000);

        btnAbrirPolitica.addEventListener('click', () => {
            modalPolitica.classList.add('ativo');
        });

        btnFecharPolitica.addEventListener('click', () => {
            modalPolitica.classList.remove('ativo');
        });

        modalPolitica.addEventListener('click', (e) => {
            if (e.target === modalPolitica) {
                modalPolitica.classList.remove('ativo');
            }
        });

        btnAceitar.addEventListener('click', () => {
            this.salvarEscolha(banner, modalPolitica);
        });

        btnRecusar.addEventListener('click', () => {
            banner.style.display = 'none';
        });
    }

    salvarEscolha(banner, modal) {
        localStorage.setItem('careplus_cookies_accepted', 'true');
        banner.style.display = 'none';
        
        modal.classList.remove('ativo');
    }
}

customElements.define('cookie-banner', CookieBanner);