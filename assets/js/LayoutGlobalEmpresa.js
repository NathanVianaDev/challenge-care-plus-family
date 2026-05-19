import { FooterCare } from '../Components/FooterCare/FooterCare.js';
import { CookieBanner } from '../Components/CookieBanner/CookieBanner.js';
import { NavbarDeslogado } from '../Components/NavbarDeslogado/NavbarDeslogado.js';
import { MeuHeader } from '../Components/HeaderLogadoEmpresa/HeaderEmpresa.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const urlAtual = window.location.pathname;

    const telasEmpresa = [
        'HomePageEmpresaLogado.html',
        'AmbienteEmpresa.html',
        'CadastrarFuncionario.html',
        'DashboardEmpresa.html',
        'ConfiguracoesEmpresa.html',
        'IncluindoEmpresa.html',
        'EditarPerfilEmpresa.html',
        'TarefasEmpresa.html',
        'RankingEmpresa.html'
    ];

    const isPaginaEmpresa = telasEmpresa.some(tela => urlAtual.includes(tela));

    if (isPaginaEmpresa) {
        document.body.insertAdjacentHTML('afterbegin', '<meu-header></meu-header>');
    } else {
        document.body.insertAdjacentHTML('afterbegin', '<navbar-deslogado></navbar-deslogado>');
    }

    document.body.insertAdjacentHTML('beforeend', '<footer-care></footer-care>');
    document.body.insertAdjacentHTML('beforeend', '<cookie-banner></cookie-banner>');
    
});