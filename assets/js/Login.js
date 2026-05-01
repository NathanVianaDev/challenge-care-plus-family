document.addEventListener('DOMContentLoaded', () => {
    const btnBeneficiario = document.getElementById('btn-log-beneficiario');
    const btnEmpresa = document.getElementById('btn-log-empresa');
    const flipContainer = document.getElementById('flip-container');

    // Clicou em Empresa
    btnEmpresa.addEventListener('click', () => {
        // Troca as cores dos botões
        btnEmpresa.classList.replace('inativo', 'ativo');
        btnBeneficiario.classList.replace('ativo', 'inativo');

        // Gira o cartão para mostrar o verso (CNPJ)
        flipContainer.classList.add('girar');
    });

    // Clicou em Beneficiário
    btnBeneficiario.addEventListener('click', () => {
        // Troca as cores dos botões
        btnBeneficiario.classList.replace('inativo', 'ativo');
        btnEmpresa.classList.replace('ativo', 'inativo');

        // Remove a classe para girar o cartão de volta (CPF)
        flipContainer.classList.remove('girar');
    });
});