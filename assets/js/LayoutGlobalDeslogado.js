import { NavbarDeslogado } from '../Components/NavbarDeslogado/NavbarDeslogado.js';
import { FooterCare } from '../Components/FooterCare/FooterCare.js';

document.addEventListener('DOMContentLoaded', () => {
    
    document.body.insertAdjacentHTML('afterbegin', '<navbar-deslogado></navbar-deslogado>');

    document.body.insertAdjacentHTML('beforeend', '<footer-care></footer-care>');
    
});