import { FooterCare } from '../Components/FooterCare/FooterCare.js';
import { CookieBanner } from '../Components/CookieBanner/CookieBanner.js';
import { NavbarDeslogado } from '../Components/NavbarDeslogado/NavbarDeslogado.js'; // Ajuste os nomes das pastas
import { MeuHeader } from '../Components/HeaderLogado/Header.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const urlAtual = window.location.pathname;

    const telasSemLogin = [
        'Index.html',
        'Odontologia.html',
        'Dermatologia.html',
        'GamePlus.html',
        'Unidades.html',
        'Contatos.html',
    ];

    const precisaDeLogin = !telasSemLogin.some(tela => urlAtual.includes(tela));

    if (telasSemLogin) {
        document.body.insertAdjacentHTML('afterbegin', '<navbar-deslogado></navbar-deslogado>');
    } else {
        document.body.insertAdjacentHTML('afterbegin', '<meu-header></meu-header>');
    }

    document.body.insertAdjacentHTML('beforeend', '<footer-care></footer-care>');
    document.body.insertAdjacentHTML('beforeend', '<cookie-banner></cookie-banner>');
    
});