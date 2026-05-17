// Arquivo: FooterCare.js

export class FooterCare extends HTMLElement {
    connectedCallback() {
        const caminhoFooterCSS = new URL('./FooterCare.css', import.meta.url).href;

        if (!document.querySelector(`link[href="${caminhoFooterCSS}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = caminhoFooterCSS;
            document.head.appendChild(link);
        }

        this.innerHTML = `
            
            <footer class="footer-container">
                <div class="footer-content">
                    
                    <div class="footer-info">
                        <p>© 2026 - Care Plus Medicina Assistencial LTDA | Todos os direitos reservados - CNPJ: 02.725.347/0001-27</p>
                        <p>Endereço: Alameda Mamoré, 687 - 12º andar | Alphaville - Barueri - SP - CEP: 06454-040</p>
                    </div>

                    <div class="footer-ans">
                        <img src="../../../assets/Images/ANS.png" alt="Selo ANS" class="img-ans">
                    </div>

                    <div class="footer-social">
                        <h4 class="footer-titulo">Redes Sociais</h4>
                        <div class="social-icons-wrapper">
                            <a href="https://www.linkedin.com/company/care-plus/" target="_blank" class="social-link">
                                <img src="../../../assets/Images/linkedin.png" alt="LinkedIn" class="img-social">
                            </a>
                            <a href="https://www.instagram.com/careplusoficial/" target="_blank" class="social-link">
                                <img src="../../../assets/Images/insta.png" alt="Instagram" class="img-social">
                            </a>
                            <a href="https://www.facebook.com/careplusnarede/" target="_blank" class="social-link">
                                <img src="../../../assets/Images/face.png" alt="Facebook" class="img-social">
                            </a>
                            <a href="https://www.youtube.com/user/careplusnarede" target="_blank" class="social-link">
                                <img src="../../../assets/Images/yt.png" alt="YouTube" class="img-social">
                            </a>
                        </div>
                    </div>

                </div>
            </footer>
        `;
    }
}

customElements.define('footer-care', FooterCare);