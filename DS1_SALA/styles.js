let editandoLinha = null; // Variável para armazenar a linha que está sendo editada

// Função para adicionar ou editar uma linha
document.querySelector('.btn-salvar').addEventListener('click', function () {
    const bloco = document.getElementById('bloco').value;
    const numero = document.getElementById('numero').value;
    const capacidade = document.getElementById('capacidade').value;
    const ar = document.querySelector('input[name="ar"]:checked') ? document.querySelector('input[name="ar"]:checked').value : 'Não';
    const lousa = document.querySelector('input[name="lousa"]:checked') ? document.querySelector('input[name="lousa"]:checked').value : 'Não';
    const lab = document.querySelector('input[name="lab"]:checked') ? document.querySelector('input[name="lab"]:checked').value : 'Não';

    if (bloco === '' || numero === '' || capacidade === '') {
        alert('Preencha os campos obrigatórios: Bloco, Número e Capacidade.');
        return;
    }

    if (editandoLinha) {
        // Atualiza a linha existente
        editandoLinha.cells[0].textContent = bloco;
        editandoLinha.cells[1].textContent = numero;
        editandoLinha.cells[2].textContent = capacidade;
        editandoLinha.cells[3].textContent = ar;
        editandoLinha.cells[4].textContent = lousa;
        editandoLinha.cells[5].textContent = lab;
        editandoLinha = null; // Limpa a referência da linha editada
    } else {
        // Adiciona uma nova linha
        const table = document.querySelector('.salas-table tbody');
        const newRow = table.insertRow();

        newRow.innerHTML = `
            <td>${bloco}</td>
            <td>${numero}</td>
            <td>${capacidade}</td>
            <td>${ar}</td>
            <td>${lousa}</td>
            <td>${lab}</td>
            <td>
                <button class="btn-editar">Editar</button>
                <button class="btn-excluir">Excluir</button>
                <button class="btn-indisponibilizar">Indisponibilizar</button>
            </td>
        `;
    }

    // Limpar os campos
    document.getElementById('bloco').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('capacidade').value = '';
    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
});

// Função para preencher os campos ao clicar em Editar
document.querySelector('.salas-table').addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-editar')) {
        const linha = e.target.closest('tr');
        editandoLinha = linha; // Armazena a linha que está sendo editada

        // Preenche os campos com os valores da linha selecionada
        document.getElementById('bloco').value = linha.cells[0].textContent;
        document.getElementById('numero').value = linha.cells[1].textContent;
        document.getElementById('capacidade').value = linha.cells[2].textContent;

        const ar = linha.cells[3].textContent === 'Sim';
        const lousa = linha.cells[4].textContent === 'Sim';
        const lab = linha.cells[5].textContent === 'Sim';

        document.querySelector(`input[name="ar"][value="${ar ? 'Sim' : 'Não'}"]`).checked = true;
        document.querySelector(`input[name="lousa"][value="${lousa ? 'Sim' : 'Não'}"]`).checked = true;
        document.querySelector(`input[name="lab"][value="${lab ? 'Sim' : 'Não'}"]`).checked = true;
    }

    // Função para excluir uma linha
    if (e.target.classList.contains('btn-excluir')) {
        const linha = e.target.closest('tr'); // Encontra a linha correspondente
        linha.remove(); // Remove a linha da tabela
    }
});
