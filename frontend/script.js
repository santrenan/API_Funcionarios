const API_URL = 'http://localhost:3000/funcionarios';

document.addEventListener('DOMContentLoaded', () => {
  carregarFuncionarios();

  document.getElementById('form-funcionario').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('funcionarioId').value;
    const nome = document.getElementById('nome').value;
    const cargo = document.getElementById('cargo').value;
    const salario = parseFloat(document.getElementById('salario').value);

    const funcionario = { nome, cargo, salario };

    if (id) {
      fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(funcionario)
      }).then(() => {
        limparFormulario();
        carregarFuncionarios();
      });
    } else {
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(funcionario)
      }).then(() => {
        limparFormulario();
        carregarFuncionarios();
      });
    }
  });
});

function carregarFuncionarios() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector('#tabela tbody');
      tbody.innerHTML = '';
      data.forEach(func => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${func.id}</td>
          <td>${func.nome}</td>
          <td>${func.cargo}</td>
          <td>R$ ${parseFloat(func.salario).toFixed(2)}</td>
          <td>
            <button class="action-btn" title="Editar" onclick="editarFuncionario(${func.id}, '${func.nome}', '${func.cargo}', ${func.salario})">📝</button>
            <button class="action-btn" title="Apagar" onclick="deletarFuncionario(${func.id})">🗑️</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    });
}

function editarFuncionario(id, nome, cargo, salario) {
  document.getElementById('funcionarioId').value = id;
  document.getElementById('nome').value = nome;
  document.getElementById('cargo').value = cargo;
  document.getElementById('salario').value = salario;
}

function deletarFuncionario(id) {
  if (confirm('Deseja excluir este funcionário?')) {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    }).then(() => carregarFuncionarios());
  }
}

function limparFormulario() {
  document.getElementById('funcionarioId').value = '';
  document.getElementById('nome').value = '';
  document.getElementById('cargo').value = '';
  document.getElementById('salario').value = '';
}
