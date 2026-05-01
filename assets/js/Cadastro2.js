document.addEventListener('DOMContentLoaded', () => {
    const btnBeneficiario = document.getElementById('btn-beneficiario');
    const btnEmpresa = document.getElementById('btn-empresa');

    const caixaCpf = document.getElementById('caixa-cpf');
    const caixaCnpj = document.getElementById('caixa-cnpj');
    const caixaNome = document.getElementById('caixa-nome');
    const caixaRazaoSocial = document.getElementById('caixa-razao-social');
    const concluirPessoal = document.getElementById('concluir-beneficiario');
    const concluirEmpresa = document.getElementById('concluir-empresa');

    btnEmpresa.addEventListener('click', () => {
        btnEmpresa.classList.replace('inativo', 'ativo');
        btnBeneficiario.classList.replace('ativo', 'inativo');

        caixaCpf.style.display = 'none';
        caixaNome.style.display = 'none';
        concluirPessoal.style.display = 'none';
        
        caixaRazaoSocial.style.display = 'block';
        caixaCnpj.style.display = 'block';
        concluirEmpresa.style.display = 'block';
    });

    btnBeneficiario.addEventListener('click', () => {
        btnBeneficiario.classList.replace('inativo', 'ativo');
        btnEmpresa.classList.replace('ativo', 'inativo');

        caixaCnpj.style.display = 'none';
        caixaRazaoSocial.style.display = 'none';
        concluirEmpresa.style.display = 'none';
        
        caixaNome.style.display = 'block';
        caixaCpf.style.display = 'flex'; 
        concluirPessoal.style.display = 'block';
    });
});