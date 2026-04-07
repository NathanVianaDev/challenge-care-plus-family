document.addEventListener('DOMContentLoaded', () => {
    const btnBeneficiario = document.getElementById('btn-beneficiario');
    const btnEmpresa = document.getElementById('btn-empresa');

    const caixaCpf = document.getElementById('caixa-cpf');
    const caixaCnpj = document.getElementById('caixa-cnpj');
    const caixaNome = document.getElementById('caixa-nome');
    const caixaRazaoSocial = document.getElementById('caixa-razao-social');
    const concluirPessoal = document.getElementById('concluir-beneficiario');
    const concluirEmpresa = document.getElementById('concluir-empresa');

    // Clicou em Empresa
    btnEmpresa.addEventListener('click', () => {
        // Troca as cores dos botões
        btnEmpresa.classList.replace('inativo', 'ativo');
        btnBeneficiario.classList.replace('ativo', 'inativo');

        // Esconde o campo CPF e mostra o CNPJ
        caixaCpf.style.display = 'none';
        caixaNome.style.display = 'none';
        concluirPessoal.style.display = 'none';
        concluirEmpresa.style.display = 'block';
        caixaRazaoSocial.style.display = 'block';
        caixaCnpj.style.display = 'block';
    });

    // Clicou em Beneficiário
    btnBeneficiario.addEventListener('click', () => {
        // Troca as cores dos botões
        btnBeneficiario.classList.replace('inativo', 'ativo');
        btnEmpresa.classList.replace('ativo', 'inativo');

        // Esconde o campo CNPJ e mostra o CPF
        caixaCnpj.style.display = 'none';
        caixaRazaoSocial.style.display = 'none';
        concluirEmpresa.style.display = 'none';
        concluirPessoal.style.display = 'block';
        caixaNome.style.display = 'block';
        caixaCpf.style.display = 'block';
    });
});