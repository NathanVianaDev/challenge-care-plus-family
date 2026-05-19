document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCadastroFunc');
    const listaFuncionarios = document.querySelector('.corpo-lista');
    const modalElement = document.getElementById('modalCadastro');
    const modalBS = new bootstrap.Modal(modalElement);

    const ordenarLista = () => {
        const cards = Array.from(listaFuncionarios.querySelectorAll('cadastrar-funcionario'));
        
        cards.sort((a, b) => {
            const nomeA = a.getAttribute('nome').toLowerCase();
            const nomeB = b.getAttribute('nome').toLowerCase();
            return nomeA.localeCompare(nomeB);
        });

        cards.forEach(card => listaFuncionarios.appendChild(card));
    };

    document.querySelector('.corpo-lista').addEventListener('deletar-funcionario', (e) => {
        const confirmacao = confirm(`Deseja realmente remover ${e.detail.nome} da Microsoft?`);
        if (confirmacao) {
            e.target.remove();
        }
    });

    ordenarLista();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nomeFunc').value;
        const idade = document.getElementById('idadeFunc').value;
        const admissaoRaw = document.getElementById('admissaoFunc').value;
        const status = document.getElementById('statusFunc').value;
        const admissao = admissaoRaw.split('-').reverse().join('/');

        const novoFunc = document.createElement('cadastrar-funcionario');
        novoFunc.setAttribute('nome', nome);
        novoFunc.setAttribute('idade', idade);
        novoFunc.setAttribute('admissao', admissao);
        novoFunc.setAttribute('status', status);

        listaFuncionarios.appendChild(novoFunc);

        ordenarLista();

        form.reset();
        modalBS.hide();

        novoFunc.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
    });
});