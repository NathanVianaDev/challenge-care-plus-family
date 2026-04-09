import { FooterCare } from '../Components/FooterCare/FooterCare.js';
import { CookieBanner } from '../Components/CookieBanner/CookieBanner.js';
import { NavbarDeslogado } from '../Components/NavbarDeslogado/NavbarDeslogado.js'; // Ajuste os nomes das pastas
import { MeuHeader } from '../Components/HeaderLogado/Header.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Descobre o nome do arquivo atual (Ex: "Login.html" ou "Perfil.html")
    const urlAtual = window.location.pathname;

    // 2. Lista com os nomes de TODAS as telas que devem ter o Header DESLOGADO
    const telasSemLogin = [
        'Login.html', 
        'Cadastro.html', 
        'ConcluirCadastroPessoal.html',
        'ConcluirCadastroEmpresarial.html',
        'index.html'
    ];

    // 3. Verifica se a tela atual está dentro da nossa lista ali de cima
    const precisaDeLogin = !telasSemLogin.some(tela => urlAtual.includes(tela));

    if (precisaDeLogin) {
        document.body.insertAdjacentHTML('afterbegin', '<meu-header></meu-header>');
    } else {
        document.body.insertAdjacentHTML('afterbegin', '<navbar-deslogado></navbar-deslogado>');
    }

    document.body.insertAdjacentHTML('beforeend', '<footer-care></footer-care>');
    document.body.insertAdjacentHTML('beforeend', '<cookie-banner></cookie-banner>');
    
});