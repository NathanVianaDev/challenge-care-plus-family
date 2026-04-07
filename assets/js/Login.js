document.addEventListener('DOMContentLoaded', () => {
    const btnBeneficiario = document.getElementById('btn-beneficiario');
    const btnEmpresa = document.getElementById('btn-empresa');

    const caixaCpf = document.getElementById('caixa-cpf');
    const caixaCnpj = document.getElementById('caixa-cnpj');

    // Clicou em Empresa
    btnEmpresa.addEventListener('click', () => {
        // Troca as cores dos botões
        btnEmpresa.classList.replace('inativo', 'ativo');
        btnBeneficiario.classList.replace('ativo', 'inativo');

        // Esconde o campo CPF e mostra o CNPJ
        caixaCpf.style.display = 'none';
        caixaCnpj.style.display = 'block';
    });

    // Clicou em Beneficiário
    btnBeneficiario.addEventListener('click', () => {
        // Troca as cores dos botões
        btnBeneficiario.classList.replace('inativo', 'ativo');
        btnEmpresa.classList.replace('ativo', 'inativo');

        // Esconde o campo CNPJ e mostra o CPF
        caixaCnpj.style.display = 'none';
        caixaCpf.style.display = 'block';
    });
});