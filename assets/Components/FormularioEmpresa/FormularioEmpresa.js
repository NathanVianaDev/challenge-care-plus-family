class FormularioEmpresa extends HTMLElement {
    constructor() {
        super();
        this.colaboradores = [
            { nome: 'Harry Potter', iniciais: 'HP' },
            { nome: 'Hermione Granger', iniciais: 'HG' },
            { nome: 'Rony Weasley', iniciais: 'RW' },
            { nome: 'Draco Malfoy', iniciais: 'DM' },
            { nome: 'Neville Longbottom', iniciais: 'NL' },
            { nome: 'Luna Lovegood', iniciais: 'LL' }
        ];
        // Variável para controlar a mensagem do modal
        this.mensagemModal = null;
    }

    connectedCallback() {
        this.render();
        this.configurarEventos();
        this.atualizarListaColaboradores();
    }

    render() {
        this.innerHTML = `
            <style>
                .container-img-empresa { height: 580px; width: 100%; }
                .lista-colaboradores { max-height: 200px; overflow-y: auto; }
                .lista-colaboradores::-webkit-scrollbar { width: 6px; }
                .lista-colaboradores::-webkit-scrollbar-thumb { background-color: #3aadde; border-radius: 10px; }
                @media (max-width: 991px) { .container-img-empresa { height: 350px; } }

                .btn-azul { background-color: #3aadde !important; color: white !important; border: none !important; transition: 0.3s; }
                .btn-azul:hover { background-color: #2c8eb5 !important; transform: translateY(-2px); }
                
                /* Estilo do logo dentro da mensagem */
                .logo-mensagem { max-height: 30px; width: auto; opacity: 0.8; }
            </style>

            <div class="card shadow-lg border-0 p-4 mx-auto" style="border-radius: 20px; background-color: white; max-width: 1200px;">
                
                <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    <h2 class="fw-light m-0 fs-3">Dados da <span class="fw-bold">Empresa</span></h2>
                    <div class="d-flex gap-2">
                        <button class="btn btn-azul fw-bold px-4 rounded-pill shadow-sm">Avatar</button>
                        <button class="btn btn-azul fw-bold px-4 rounded-pill shadow-sm">Família</button>
                    </div>
                </div>

                <div class="row g-4 align-items-stretch">
                    
                    <div class="col-lg-5 order-1 order-lg-2">
                        <div class="d-block position-relative rounded-4 overflow-hidden border border-4 border-white shadow container-img-empresa">
                            <img src="/assets/Images/AmbienteEmpresa/AmbienteEmpresa.png" class="img-fluid w-100 h-100 object-fit-cover position-absolute top-0 start-0" alt="Sua Empresa Care Plus">
                        </div>
                    </div>

                    <div class="col-lg-7 order-2 order-lg-1 d-flex flex-column justify-content-between">
                        <form id="form-empresa-principal" class="h-100 d-flex flex-column">
                            
                            <div class="mb-3">
                                <label class="form-label fw-bold small mb-1">Nome da Empresa</label>
                                <input type="text" class="form-control form-control-sm rounded-3" placeholder="Ex: Microsoft Corporation">
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-bold small mb-1">CNPJ</label>
                                <input type="text" class="form-control form-control-sm rounded-3" placeholder="00.000.000/0000-00">
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-bold small mb-1">Plano</label>
                                <input type="text" class="form-control form-control-sm rounded-3" placeholder="Ex: Care Plus Empresarial">
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-bold small mb-1">Número de colaboradores</label>
                                <input type="text" class="form-control form-control-sm rounded-3" placeholder="Ex: 200+">
                            </div>

                            <div class="mt-2 flex-grow-1">
                                <div class="d-flex justify-content-between align-items-center mb-2 gap-2">
                                    <label class="form-label fw-bold small mb-0 text-nowrap">Colaboradores da Empresa</label>
                                    <input type="text" id="inputBuscaColaborador" class="form-control form-control-sm rounded-pill border-secondary border-opacity-25" placeholder="🔍 Buscar..." style="max-width: 160px; font-size: 0.8rem;">
                                </div>
                                
                                <div class="lista-colaboradores border rounded-4 shadow-inset p-2 bg-light">
                                    <div class="list-group list-group-flush gap-2" id="containerColaboradores">
                                        </div>
                                </div>
                            </div>
                            
                            <div class="text-center mt-4 pb-2">
                                <button type="button" id="btnSalvarEmpresa" class="btn btn-azul fw-bold px-5 py-2 rounded-pill shadow">Salvar Dados</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

            <div class="modal fade" id="modalConfirmacaoTeste" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-sm">
                    <div class="modal-content rounded-4 border-0 shadow-lg">
                        <div class="modal-header border-0 pb-0 justify-content-center pt-4">
                            <img src="/assets/Images/logo-care-plus.png" alt="Care Plus" class="logo-mensagem">
                        </div>
                        <div class="modal-body text-center px-4 pb-4">
                            <h6 class="fw-bold mb-2 mt-3 text-dark">Atenção: Página de Teste</h6>
                            <p class="small text-muted mb-0">
                                Por se tratar de um ambiente de simulação, os dados informados não serão salvos e o formulário será limpo.
                            </p>
                        </div>
                        <div class="modal-footer border-0 pt-0 pb-4 justify-content-center">
                            <button type="button" class="btn btn-azul btn-sm fw-bold px-4 rounded-pill" data-bs-dismiss="modal" id="btnEntendiMensagem">Entendi</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    configurarEventos() {
        // 1. Inicializa a mensagem do Bootstrap
        this.mensagemModal = new bootstrap.Modal(this.querySelector('#modalConfirmacaoTeste'));

        // 2. Lógica do campo de Busca
        const inputBusca = this.querySelector('#inputBuscaColaborador');
        inputBusca.addEventListener('input', (evento) => {
            const termoBusca = evento.target.value.toLowerCase();
            this.atualizarListaColaboradores(termoBusca);
        });

        // 3. Abrir a mensagem ao clicar em Salvar
        const btnSalvar = this.querySelector('#btnSalvarEmpresa');
        btnSalvar.addEventListener('click', () => {
            this.mensagemModal.show();
        });

        // 4. Limpar o formulário ao clicar em Entendi (com a correção de acessibilidade)
        const btnEntendi = this.querySelector('#btnEntendiMensagem');
        btnEntendi.addEventListener('click', () => {
            btnEntendi.blur(); // Tira o foco para evitar o erro do aria-hidden

            // Limpa os campos de texto
            const form = this.querySelector('#form-empresa-principal');
            if (form) form.reset();

            // Limpa a barra de busca e restaura a lista completa de colaboradores
            if (inputBusca) inputBusca.value = '';
            this.atualizarListaColaboradores();
        });
    }

    atualizarListaColaboradores(filtro = '') {
        const container = this.querySelector('#containerColaboradores');
        container.innerHTML = '';

        const colaboradoresFiltrados = this.colaboradores.filter(colab => {
            return colab.nome.toLowerCase().includes(filtro);
        });

        if (colaboradoresFiltrados.length === 0) {
            container.innerHTML = `<div class="text-center text-muted small p-3">Nenhum colaborador encontrado com "${filtro}".</div>`;
            return;
        }

        colaboradoresFiltrados.forEach(colab => {
            container.innerHTML += `
                <div class="list-group-item d-flex align-items-center p-2 rounded-3 border shadow-sm">
                    <div class="bg-dark text-white rounded-3 d-flex justify-content-center align-items-center me-3 fw-bold" style="width: 45px; height: 35px; font-size: 0.8rem;">
                        ${colab.iniciais}
                    </div>
                    <span class="fw-bold small fs-6 text-truncate">${colab.nome}</span>
                </div>
            `;
        });
    }
}

customElements.define('formulario-empresa', FormularioEmpresa);