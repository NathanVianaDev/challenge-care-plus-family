document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Sistema Care Plus Iniciado!");

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

    const btnSalvarAvatar = document.getElementById("btn-salvar-avatar");

    if (btnSalvarAvatar) {
        btnSalvarAvatar.addEventListener("click", () => {
            
            const modal = document.getElementById("alerta-global");
            
            if(modal) {
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