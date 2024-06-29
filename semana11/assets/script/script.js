document.addEventListener('DOMContentLoaded', () => {
    const tarefaInput = document.getElementById('tarefa');
    const adicionartarefaBtn = document.getElementById('adicionartarefa');
    const listinha = document.getElementById('listinha');

    carregarTarefas();

    adicionartarefaBtn.addEventListener('click', adicionarTarefa);

    function adicionarTarefa() {
        const tarefaTexto = tarefaInput.value.trim();
        if (tarefaTexto !== '') {
            const tarefa = {
                texto: tarefaTexto,
                concluida: false
            };
            criarElementoTarefa(tarefa);
            salvarTarefa(tarefa);
            tarefaInput.value = '';
        }
    }

    function criarElementoTarefa(tarefa) {
        const li = document.createElement('li');
        li.textContent = tarefa.texto;

        if (tarefa.concluida) {
            li.classList.add('completed');
        }

        const tarefaCompletaBtn = document.createElement('button');
        tarefaCompletaBtn.textContent = 'Concluir';
        tarefaCompletaBtn.className = 'complete-btn';
        tarefaCompletaBtn.addEventListener('click', () => {
            li.classList.toggle('completed');
            tarefa.concluida = !tarefa.concluida;
            atualizarTarefas();
        });

        const removerTarefaBtn = document.createElement('button');
        removerTarefaBtn.textContent = 'Remover';
        removerTarefaBtn.className = 'remove-btn';
        removerTarefaBtn.addEventListener('click', () => {
            listinha.removeChild(li);
            removerTarefa(tarefa);
        });

        li.appendChild(tarefaCompletaBtn);
        li.appendChild(removerTarefaBtn);
        listinha.appendChild(li);
    }

    function salvarTarefa(tarefa) {
        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefas.push(tarefa);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    function atualizarTarefas() {
        const tarefas = [];
        listinha.querySelectorAll('li').forEach(li => {
            tarefas.push({
                texto: li.childNodes[0].textContent,
                concluida: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    function removerTarefa(tarefa) {
        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        const novaListaTarefas = tarefas.filter(t => t.texto !== tarefa.texto);
        localStorage.setItem('tarefas', JSON.stringify(novaListaTarefas));
    }

    function carregarTarefas() {
        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefas.forEach(tarefa => {
            criarElementoTarefa(tarefa);
        });
    }
});