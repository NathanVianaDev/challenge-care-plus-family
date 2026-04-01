/**
 * Care Plus Family - Script Unificado
 * Gerencia a Dashboard.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Sistema Care Plus Iniciado!");

    // --- 1. LÓGICA DA DASHBOARD (ANIMAR CÍRCULOS) ---
    function animarCirculo(idBarra, valor, meta) {
        const barra = document.getElementById(idBarra);
        if (barra) {
            const circunferencia = 251;
            const porcentagem = Math.min(valor / meta, 1);
            const offset = circunferencia - (porcentagem * circunferencia);
            barra.style.strokeDashoffset = offset;
        }
    }

    animarCirculo('progresso-passos', 4500, 10000); 
    animarCirculo('progresso-bpm', 80, 150);
});