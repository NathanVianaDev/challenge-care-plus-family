/**
 * Care Plus Family - Script Unificado (Debug Mode)
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Script carregado com sucesso!");

    // --- 1. LÓGICA DO AVATAR ---
    const btnMasc = document.getElementById('btn-masculino');
    const btnFem = document.getElementById('btn-feminino');
    const avatarPreview = document.getElementById('main-avatar');
    const textAvatar = document.getElementById('text-avatar');

    if (btnMasc && btnFem) {
        console.log("✅ Botões de gênero encontrados!");
        
        const trocar = (genero) => {
            console.log("Changing to:", genero);
            if (avatarPreview) avatarPreview.setAttribute('genero', genero);
            
            if (genero === 'masculino') {
                btnMasc.setAttribute('active', 'true');
                btnFem.removeAttribute('active');
                if (textAvatar) textAvatar.style.color = '#0d6efd';
            } else {
                btnFem.setAttribute('active', 'true');
                btnMasc.removeAttribute('active');
                if (textAvatar) textAvatar.style.color = '#E84D8A';
            }
        };

        btnMasc.addEventListener('click', () => trocar('masculino'));
        btnFem.addEventListener('click', () => trocar('feminino'));
    } else {
        console.warn("⚠️ Botões de gênero não encontrados. Ignore se não estiver na página Avatar.");
    }

    // --- 2. LÓGICA DA DASHBOARD (Círculos/Donuts) ---
    function animarCirculo(idBarra, valor, meta) {
        const barra = document.getElementById(idBarra);
        if (barra) {
            const circunferencia = 251;
            const porcentagem = Math.min(valor / meta, 1);
            const offset = circunferencia - (porcentagem * circunferencia);
            barra.style.strokeDashoffset = offset;
            console.log(`✅ Círculo ${idBarra} animado!`);
        }
    }

    // Tenta animar os círculos da sua Dashboard
    // Verifique se no seu HTML o ID da barra verde de passos é 'progresso-passos'
    animarCirculo('progresso-passos', 4500, 10000); 
    animarCirculo('progresso-bpm', 80, 150);
});