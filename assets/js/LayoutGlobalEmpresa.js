import { FooterCare } from '../Components/FooterCare/FooterCare.js';
import { CookieBanner } from '../Components/CookieBanner/CookieBanner.js';
import { NavbarDeslogado } from '../Components/NavbarDeslogado/NavbarDeslogado.js';
import { MeuHeader } from '../Components/HeaderLogadoEmpresa/HeaderEmpresa.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const urlAtual = window.location.pathname;

    // Lista de páginas que pertencem ao ecossistema da Empresa Logada
    const telasEmpresa = [
        'HomePageEmpresaLogado.html',
        'AmbienteEmpresa.html',
        'CadastrarFuncionario.html',
        'DashboardEmpresa.html',
        'ConfiguracoesEmpresa.html',
        'IncluindoEmpresa.html'
    ];

    // Verifica se a página atual é uma página de empresa
    const isPaginaEmpresa = telasEmpresa.some(tela => urlAtual.includes(tela));

    if (isPaginaEmpresa) {
        // Injeta o Header específico da Empresa Logada
        document.body.insertAdjacentHTML('afterbegin', '<meu-header></meu-header>');
    } else {
        // Caso o script seja carregado em uma página comum, usa a navbar padrão
        document.body.insertAdjacentHTML('afterbegin', '<navbar-deslogado></navbar-deslogado>');
    }

    // Itens comuns a todas as páginas
    document.body.insertAdjacentHTML('beforeend', '<footer-care></footer-care>');
    document.body.insertAdjacentHTML('beforeend', '<cookie-banner></cookie-banner>');
    
});