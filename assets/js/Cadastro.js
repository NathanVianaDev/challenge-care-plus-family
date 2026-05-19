document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // LÓGICA DE ETAPAS - BENEFICIÁRIO
    // ==========================================
    const btnBeneficiario = document.getElementById('btn-cad-beneficiario');
    const btnEmpresa = document.getElementById('btn-cad-empresa');
    const flipContainer = document.getElementById('flip-container');
    const passo1Ben = document.getElementById('passo1-ben');
    const passo2Ben = document.getElementById('passo2-ben');
    const btnAvancarBen = document.getElementById('btn-avancar-ben');
    const btnVoltarBen = document.getElementById('btn-voltar-ben');

    btnEmpresa.addEventListener('click', () => {
        btnEmpresa.classList.replace('inativo', 'ativo');
        btnBeneficiario.classList.replace('ativo', 'inativo');

        flipContainer.classList.add('girar');
    });

    btnBeneficiario.addEventListener('click', () => {
        btnBeneficiario.classList.replace('inativo', 'ativo');
        btnEmpresa.classList.replace('ativo', 'inativo');

        flipContainer.classList.remove('girar');
    });

    btnAvancarBen.addEventListener('click', () => {
        passo1Ben.classList.remove('ativo');
        passo2Ben.classList.add('ativo');
    });

    btnVoltarBen.addEventListener('click', () => {
        passo2Ben.classList.remove('ativo');
        passo1Ben.classList.add('ativo');
    });

    // ==========================================
    // LÓGICA DE ETAPAS - EMPRESA
    // ==========================================
    const passo1Emp = document.getElementById('passo1-emp');
    const passo2Emp = document.getElementById('passo2-emp');
    const btnAvancarEmp = document.getElementById('btn-avancar-emp');
    const btnVoltarEmp = document.getElementById('btn-voltar-emp');

    btnAvancarEmp.addEventListener('click', () => {
        passo1Emp.classList.remove('ativo');
        passo2Emp.classList.add('ativo');
    });

    btnVoltarEmp.addEventListener('click', () => {
        passo2Emp.classList.remove('ativo');
        passo1Emp.classList.add('ativo');
    });
});