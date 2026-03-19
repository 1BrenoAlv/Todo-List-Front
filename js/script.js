const form = document.querySelector('.form-tarefa')
const listaContainer = document.querySelector('.lista-tarefa')
const statusLinks = document.querySelectorAll('.filtro')

let tarefas = []
let idInitial = 0
let idTarefa = null;

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const titulo = form.querySelector('input[type="text"]').value
    const descricao = form.querySelector('textarea').value
    const data = form.querySelector('input[type="datetime-local"]').value

    if (new Date(data) <= new Date()) {
        alert('Não pode colocar uma data que já passou! Tente novamente.')
        return
    }

    const novaTarefa = {
        id: idInitial++,
        titulo: titulo,
        descricao: descricao,
        data: data,
        dataCriacao: new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(',', ''),
        statusTarefa: 'Pendente',
    }
    if (novaTarefa != null) {
        tarefas.push(novaTarefa)
        form.reset()
        exibirTarefas()
    } else {
        alert("Erro ao criar uma tarefa!")
    }

})

function exibirTarefas(filtro = 'Todos') {
    listaContainer.innerHTML = ''

    const tarefasFiltradas = tarefas.filter(t => {
        if (filtro === 'Todos') return true
        return t.statusTarefa === filtro
    })

    if (tarefasFiltradas.length == 0) {
        const card = document.createElement('div')
        card.className = 'mensagem-lista'
        card.innerHTML = `<p id="mensagem-vazio">Nenhuma tarefa por aqui ainda... 😴</p>`
        listaContainer.appendChild(card)
    } else {
        tarefasFiltradas.forEach((tarefa, i) => {
            const card = document.createElement('div')
            card.className = 'tarefa'
            const dataExibicao = tarefa.data
                ? new Date(tarefa.data).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
                : 'Não definido';

            card.innerHTML = `
        <div class="informacao-tarefa">
            <div class="opcional-tarefa">
                <a class="status-tarefa status-${tarefa.statusTarefa.toLowerCase()}">${tarefa.statusTarefa}</a>
            </div>
           <div class="excluir-editar-tarefa">
                <a onclick="excluirTarefa(${tarefa.id})"><i class="bi bi-trash3-fill"></i></a>
                <a onclick="editarTarefa(${tarefa.id})"><i class="bi bi-pencil-square"></i></a>
            </div>
        </div>
        <div class="conteudo-tarefa">
            <div class="titulo-tarefa">
                <h4>${tarefa.titulo.length > 40 ? `${tarefa.titulo.slice(0, 40)}...` : tarefa.titulo}</h4>
            </div>
            <div class="descricao-tarefa">
                <p>${tarefa.descricao.length > 60 ? `${tarefa.descricao.slice(0, 60)}...` : tarefa.descricao}</p>
            </div>
        </div>
        <div class="horas-tarefa">
            <span class="hora-criada">Criado: ${tarefa.dataCriacao}</span>
            <span class="hora-prazo">Prazo: ${dataExibicao}</span>
        </div>
        `
            listaContainer.appendChild(card)
        })
    }
}


function editarTarefa(id) {
    idTarefa = id
    const tarefaSelecionada = tarefas.find(t => t.id === id);
    document.getElementById('edit-titulo').value = tarefaSelecionada.titulo
    document.getElementById('edit-descricao').value = tarefaSelecionada.descricao
    document.getElementById('edit-data').value = tarefaSelecionada.data
    document.getElementById('edit-status').value = tarefaSelecionada.statusTarefa
    let modal = document.querySelector('.overlay-modal')
    modal.style.display = 'flex'
}

function salvarEdicao(e) {
    e.preventDefault()
    if (idTarefa != null) {
        const tarefa = tarefas.find(t => t.id == idTarefa)
        tarefa.titulo = document.getElementById('edit-titulo').value
        tarefa.descricao = document.getElementById('edit-descricao').value
        const data = tarefa.data = document.getElementById('edit-data').value
        if (new Date(data) <= new Date()) {
            alert('Não pode colocar uma data que já passou! Tente novamente.')
            return
        }
        tarefa.statusTarefa = document.getElementById('edit-status').value
        fecharModal()
        exibirTarefas()
    }
}

function fecharModal() {
    let modal = document.querySelector('.overlay-modal')
    modal.style.display = 'none'
}

function filtrarTarefas(statusTarefa) {
    exibirTarefas(statusTarefa);
}
function excluirTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    alert(`Tarefa excluida!`)
    exibirTarefas();
}

