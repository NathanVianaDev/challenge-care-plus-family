class FormularioFamilia extends HTMLElement {
    constructor() {
        super();
        this.membros = [];
        this.mensagemModal = null;
        this.modalInclusao = null;
        this.modalRemocao = null;
        this.membroTemporario = null;
        this.indexRemocaoAtiva = null;
    }

    connectedCallback() {
        this.render();
        this.configurarEventos();
    }

    render() {
        this.innerHTML = `
            <style>
                .container-img-familia { height: 580px; width: 100%; }
                .tabela-membros-scroll { max-height: 145px; overflow-y: auto; display: none; }
                .tabela-membros-scroll::-webkit-scrollbar { width: 6px; }
                .tabela-membros-scroll::-webkit-scrollbar-thumb { background-color: #3aadde; border-radius: 10px; }
                @media (max-width: 991px) { .container-img-familia { height: 350px; } }
                
                .logo-mensagem { max-height: 30px; width: auto; opacity: 0.8; }
            </style>

            <div class="card shadow-lg border-0 p-4 mx-auto" style="border-radius: 20px; background-color: white; max-width: 1200px;">
                
                <div class="">
                    <div class="row g-3 mb-5">
                        <div class="col-12 col-md-3">
                            <botao-voltar texto="Voltar" href="../AmbienteFamilia/AmbienteFamilia.html"></botao-voltar>
                        </div>
                        <h2 class="fw-light m-0 fs-3 w-100 text-center">Personalize sua <span class="fw-bold">Família</span></h2>
                    </div>
                </div>

                <div class="row g-4 align-items-stretch">
                    
                    <div class="col-lg-5 order-1 order-lg-2">
                        <div class="d-block position-relative rounded-4 overflow-hidden border border-4 border-white shadow container-img-familia">
                            <img src="/assets/Images/FamiliaCarplus/Familia-CarPlus01.png" class="img-fluid w-100 h-100 object-fit-cover position-absolute top-0 start-0" alt="Sua Família Care Plus">
                        </div>
                    </div>

                    <div class="col-lg-7 order-2 order-lg-1 d-flex flex-column justify-content-between">
                        <form id="form-familia-principal" class="h-100 d-flex flex-column">
                            
                            <div class="mb-3">
                                <label class="form-label fw-bold small mb-1">Sobrenome da Família</label>
                                <input type="text" class="form-control form-control-sm rounded-3" placeholder="Ex: Silva">
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-bold small mb-1">Compartilhar Dados:</label>
                                <div class="d-flex flex-wrap gap-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="dadosNao" checked>
                                        <label class="form-check-label small" for="dadosNao">Não compartilhar</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="dadosFamilia">
                                        <label class="form-check-label small" for="dadosFamilia">Família</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="dadosEmpresa">
                                        <label class="form-check-label small" for="dadosEmpresa">Empresa</label>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-bold small mb-1">Compartilhar Notificações:</label>
                                <div class="d-flex gap-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="notificacoes" id="notifNao" value="nao" checked>
                                        <label class="form-check-label small" for="notifNao">Não</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="notificacoes" id="notifSim" value="sim">
                                        <label class="form-check-label small" for="notifSim">Sim</label>
                                    </div>
                                </div>
                            </div>

                            <div class="p-3 bg-light rounded-4 border shadow-sm mb-3">
                                <h5 class="fw-bold mb-2 fs-6" style="color: #3aadde;">Cadastre sua Família</h5>
                                <div class="row g-2">
                                    <div class="col-md-6">
                                        <label class="form-label small fw-bold mb-1">Nome Completo <span class="text-danger">*</span></label>
                                        <input type="text" id="inputNomeMembro" class="form-control form-control-sm rounded-3">
                                        <div id="erroNomeMembro" class="text-danger mt-1 d-none" style="font-size: 0.75rem; font-weight: 500;"><i class="bi bi-exclamation-circle"></i> O Nome é obrigatório.</div>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label small fw-bold mb-1">CPF <span class="text-danger">*</span></label>
                                        <input type="text" id="inputCpfMembro" class="form-control form-control-sm rounded-3">
                                        <div id="erroCpfMembro" class="text-danger mt-1 d-none" style="font-size: 0.75rem; font-weight: 500;"><i class="bi bi-exclamation-circle"></i> O CPF é obrigatório.</div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center mt-3">
                                    <div class="form-check m-0">
                                        <input class="form-check-input" type="checkbox" id="checkResponsavel">
                                        <label class="form-check-label small fw-bold" for="checkResponsavel">Responsável</label>
                                    </div>
                                    <button type="button" id="btnIncluirMembro" class="btn btn-verde btn-sm px-4 rounded-pill fw-bold shadow-sm">Incluir Membro</button>
                                </div>
                            </div>
                            
                            <div class="tabela-membros-scroll border rounded-4 shadow-inset px-2 pb-2 mb-3" id="containerTabelaMembros">
                                <table class="tabela-membros m-0 w-100">
                                    <thead style="position: sticky; top: 0; background-color: #f1f5f9; z-index: 10;">
                                        <tr>
                                            <th class="ps-2 pt-3">Nome</th>
                                            <th class="text-center pt-3">Responsável</th>
                                            <th class="text-center pt-3">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody id="corpoTabelaMembros"></tbody>
                                </table>
                            </div>
                            
                            <div class="text-center mt-auto pb-2">
                                <button type="button" id="btnSalvarPrincipal" class="btn btn-azul fw-bold px-5 py-2 rounded-pill shadow">Salvar Alterações</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

            <div class="modal fade" id="modalConfirmacaoTeste" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-sm">
                    <div class="modal-content rounded-4 border-0 shadow-lg">
                        <div class="modal-header border-0 pb-0 justify-content-center pt-4">
                            <img src="/assets/Images/logo-care-plus.png" alt="Care Plus" class="logo">
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

            <div class="modal fade" id="modalConfirmarInclusao" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-sm">
                    <div class="modal-content rounded-4 border-0 shadow-lg">
                        <div class="modal-body text-center p-4">
                            <h5 class="fw-bold mb-3" style="color: #3aadde;">Adicionar Membro</h5>
                            <p class="small text-muted mb-3">Verifique os dados antes de incluir:</p>
                            
                            <div class="text-start bg-light p-3 rounded-3 mb-4 small border">
                                <p class="mb-1 text-truncate"><strong>Nome:</strong> <span id="confirmNomeMembro"></span></p>
                                <p class="mb-1"><strong>CPF:</strong> <span id="confirmCpfMembro"></span></p>
                                <p class="mb-0"><strong>É Responsável?</strong> <span id="confirmRespMembro"></span></p>
                            </div>

                            <div class="d-flex gap-2 justify-content-center">
                                <button type="button" class="btn btn-light btn-sm fw-bold px-3 rounded-pill w-100 border" data-bs-dismiss="modal">Revisar</button>
                                <button type="button" class="btn btn-verde btn-sm fw-bold px-3 rounded-pill w-100" id="btnSimIncluir">Sim, Incluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="modalConfirmarRemocao" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-sm">
                    <div class="modal-content rounded-4 border-0 shadow-lg">
                        <div class="modal-body text-center p-4">
                            <i class="bi bi-trash3 text-danger mb-3" style="font-size: 2.5rem;"></i>
                            <h5 class="fw-bold mb-2">Remover Membro?</h5>
                            <p class="small text-muted mb-4">Tem certeza que deseja excluir <strong id="nomeMembroRemover" class="text-dark"></strong> da lista?</p>
                            
                            <div class="d-flex gap-2 justify-content-center">
                                <button type="button" class="btn btn-light btn-sm fw-bold px-4 rounded-pill w-100 border" data-bs-dismiss="modal">Não</button>
                                <button type="button" class="btn btn-danger btn-sm fw-bold px-4 rounded-pill w-100" id="btnSimRemover">Sim, Remover</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    configurarEventos() {
        this.mensagemModal = new bootstrap.Modal(this.querySelector('#modalConfirmacaoTeste'));
        this.modalInclusao = new bootstrap.Modal(this.querySelector('#modalConfirmarInclusao'));
        this.modalRemocao = new bootstrap.Modal(this.querySelector('#modalConfirmarRemocao'));

        const checkNao = this.querySelector('#dadosNao');
        const checkFamilia = this.querySelector('#dadosFamilia');
        const checkEmpresa = this.querySelector('#dadosEmpresa');

        checkNao.addEventListener('change', () => {
            if (checkNao.checked) { checkFamilia.checked = false; checkEmpresa.checked = false; }
        });

        const desmarcarNao = () => {
            if (checkFamilia.checked || checkEmpresa.checked) { checkNao.checked = false; } 
            else if (!checkFamilia.checked && !checkEmpresa.checked) { checkNao.checked = true; }
        };

        checkFamilia.addEventListener('change', desmarcarNao);
        checkEmpresa.addEventListener('change', desmarcarNao);

        const btnIncluir = this.querySelector('#btnIncluirMembro');
        const inputNome = this.querySelector('#inputNomeMembro');
        const inputCpf = this.querySelector('#inputCpfMembro');
        const erroNome = this.querySelector('#erroNomeMembro');
        const erroCpf = this.querySelector('#erroCpfMembro');
        const checkResp = this.querySelector('#checkResponsavel');

        inputNome.addEventListener('input', () => { inputNome.classList.remove('is-invalid'); erroNome.classList.add('d-none'); });
        inputCpf.addEventListener('input', () => { inputCpf.classList.remove('is-invalid'); erroCpf.classList.add('d-none'); });

        btnIncluir.addEventListener('click', () => {
            const nomeValido = inputNome.value.trim();
            const cpfValido = inputCpf.value.trim();
            let formValido = true;

            if (!nomeValido) {
                inputNome.classList.add('is-invalid');
                erroNome.classList.remove('d-none');
                formValido = false;
            }
            if (!cpfValido) {
                inputCpf.classList.add('is-invalid');
                erroCpf.classList.remove('d-none');
                formValido = false;
            }

            if (formValido) {
                this.membroTemporario = {
                    nome: nomeValido,
                    cpf: cpfValido,
                    responsavel: checkResp.checked
                };

                this.querySelector('#confirmNomeMembro').innerText = nomeValido;
                this.querySelector('#confirmCpfMembro').innerText = cpfValido;
                this.querySelector('#confirmRespMembro').innerHTML = checkResp.checked ? '<span class="text-success fw-bold">Sim</span>' : 'Não';

                this.modalInclusao.show();
            }
        });

        this.querySelector('#btnSimIncluir').addEventListener('click', () => {
            if (this.membroTemporario) {
                this.membros.push(this.membroTemporario);
                
                inputNome.value = '';
                inputCpf.value = '';
                checkResp.checked = false;
                this.membroTemporario = null;
                
                this.atualizarTabela();
                this.modalInclusao.hide();
            }
        });

        this.querySelector('#corpoTabelaMembros').addEventListener('click', (e) => {
            const btnRemover = e.target.closest('.btn-remover-membro');
            if (btnRemover) {
                this.indexRemocaoAtiva = parseInt(btnRemover.getAttribute('data-index'));
                const nomeParaRemover = this.membros[this.indexRemocaoAtiva].nome;
                
                this.querySelector('#nomeMembroRemover').innerText = nomeParaRemover;
                this.modalRemocao.show();
            }
        });

        this.querySelector('#btnSimRemover').addEventListener('click', () => {
            if (this.indexRemocaoAtiva !== null) {
                this.membros.splice(this.indexRemocaoAtiva, 1);
                this.indexRemocaoAtiva = null;
                this.atualizarTabela();
                this.modalRemocao.hide();
            }
        });

        const btnSalvar = this.querySelector('#btnSalvarPrincipal');
        btnSalvar.addEventListener('click', () => { this.mensagemModal.show(); });

        const btnEntendi = this.querySelector('#btnEntendiMensagem');
        btnEntendi.addEventListener('click', () => {
            btnEntendi.blur();
            const form = this.querySelector('#form-familia-principal');
            if (form) form.reset();
            this.membros = [];
            this.atualizarTabela();
        });
    }

    atualizarTabela() {
        const containerTabela = this.querySelector('#containerTabelaMembros');
        const corpoTabela = this.querySelector('#corpoTabelaMembros');
        
        if (this.membros.length > 0) {
            containerTabela.style.display = 'block';
            corpoTabela.innerHTML = '';
            
            this.membros.forEach((membro, index) => {
                const iconResponsavel = membro.responsavel ? '<span class="icon-responsavel">✔ Sim</span>' : '<span class="text-muted">Não</span>';
                
                corpoTabela.innerHTML += `
                    <tr>
                        <td class="py-2 ps-2 align-middle">${membro.nome}</td>
                        <td class="py-2 text-center align-middle">${iconResponsavel}</td>
                        <td class="py-2 text-center align-middle">
                            <button type="button" class="btn btn-sm btn-remover-membro" data-index="${index}" title="Remover Membro">
                                <i class="bi bi-trash3 text-danger"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
            containerTabela.scrollTop = containerTabela.scrollHeight;
        } else {
            containerTabela.style.display = 'none';
        }
    }
}

customElements.define('formulario-familia', FormularioFamilia);