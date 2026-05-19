document.addEventListener('DOMContentLoaded', () => {
    const btnBeneficiario = document.getElementById('btn-log-beneficiario');
    const btnEmpresa = document.getElementById('btn-log-empresa');
    const flipContainer = document.getElementById('flip-container');

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
});