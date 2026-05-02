document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formCadastroFunc');
    const listaFuncionarios = document.querySelector('.corpo-lista');
    const modalElement = document.getElementById('modalCadastro');
    const modalBS = new bootstrap.Modal(modalElement);

    // Função para ordenar a lista alfabeticamente
    const ordenarLista = () => {
        // 1. Pegar todos os componentes de funcionários atuais
        const cards = Array.from(listaFuncionarios.querySelectorAll('cadastrar-funcionario'));
        
        // 2. Ordenar o array baseado no atributo 'nome'
        cards.sort((a, b) => {
            const nomeA = a.getAttribute('nome').toLowerCase();
            const nomeB = b.getAttribute('nome').toLowerCase();
            return nomeA.localeCompare(nomeB);
        });

        // 3. Re-adicionar na lista (o appendChild em elementos existentes apenas os move de lugar)
        cards.forEach(card => listaFuncionarios.appendChild(card));
    };

    document.querySelector('.corpo-lista').addEventListener('deletar-funcionario', (e) => {
        const confirmacao = confirm(`Deseja realmente remover ${e.detail.nome} da Microsoft?`);
        if (confirmacao) {
            e.target.remove(); // Remove o componente da tela
        }
    });

    // Ordenar a lista assim que a página carregar (para os bruxos do Harry Potter)
    ordenarLista();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nomeFunc').value;
        const idade = document.getElementById('idadeFunc').value;
        const admissaoRaw = document.getElementById('admissaoFunc').value;
        const status = document.getElementById('statusFunc').value;
        const admissao = admissaoRaw.split('-').reverse().join('/');

        // Criar o novo componente
        const novoFunc = document.createElement('cadastrar-funcionario');
        novoFunc.setAttribute('nome', nome);
        novoFunc.setAttribute('idade', idade);
        novoFunc.setAttribute('admissao', admissao);
        novoFunc.setAttribute('status', status);

        // Adicionar na lista
        listaFuncionarios.appendChild(novoFunc);

        // Chamar a ordenação
        ordenarLista();

        // Limpar e fechar
        form.reset();
        modalBS.hide();

        // Scroll suave até o novo funcionário inserido
        novoFunc.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
    });
});