const form = document.querySelector('.form-tarefa')
const listaContainer = document.querySelector('.lista-tarefa')
const statusLinks = document.querySelectorAll('.filtro')

let tarefas = []
let idInitial = 0

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const titulo = form.querySelector('input[type="text"]').value
    const descricao = form.querySelector('textarea').value
    const data = form.querySelector('input[type="date"]').value
    const novaTarefa = {
        id: idInitial++,
        titulo,
        descricao,
        data,
        status: 'Pendente',
        favorito: false,
    }

    tarefas.push(novaTarefa)
    form.reset()
    exibirTarefas()
})

function exibirTarefas(filtro = 'Todos') {
    listaContainer.innerHTML = ''

    const tarefasFiltradas = tarefas.filter(t => {
        if (filtro === 'Todos') return true
        return t.status === filtro
    })
    
    tarefasFiltradas.forEach((tarefa, i) => {
        const card = document.createElement('div')
        card.className = 'tarefa'

        card.innerHTML = `
        <div class="informacao-tarefa">
            <p>${tarefa.data || 'Sem data'}</p>

            <div class="opcional-tarefa">
                <a class="status-tarefa">${tarefa.status}</a>
            </div>
            <div class="favorito-tarefa">
                <input type="checkbox" ${tarefa.favorito ? 'checked' : ''} 
                           onclick="alternarFavorito(${tarefa.id})">
            </div>
        </div>
        <div class="conteudo-tarefa">
            <div class="titulo-tarefa">
                <h4>${tarefa.titulo}</h4>
            </div>
            <div class="descricao-tarefa">
                <p>${tarefa.descricao}</p>
            </div>
        </div>
        `
        listaContainer.appendChild(card)
    })
}
function filtrarTarefas(status) {
    exibirTarefas(status);
}
function filtrarTarefas(status) {
    exibirTarefas(status);
}
function excluirTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    exibirTarefas();
}
function mudarStatus(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        tarefa.status = tarefa.status === 'Concluido' ? 'Pendente' : 'Concluido';
        exibirTarefas();
    }
}