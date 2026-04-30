/**
 * Care Plus Family - Script Unificado
 * Gerencia a Dashboard e Interações Globais.
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

    // --- 2. DISPARAR O ALERTA NO CLIQUE DO BOTÃO ---
    const btnSalvarAvatar = document.getElementById("btn-salvar-avatar");

    if (btnSalvarAvatar) {
        btnSalvarAvatar.addEventListener("click", () => {
            
            // Puxa o componente do HTML
            const modal = document.getElementById("alerta-global");
            
            if(modal) {
                // Dispara passando os textos dinâmicos que você precisa
                modal.disparar(
                    "Avatar Salvo!", 
                    "As alterações visuais do seu avatar foram atualizadas com sucesso em seu perfil."
                );
            } else {
                console.error("Componente <modal-alerta> não encontrado na página.");
            }
            
        });
    }
});