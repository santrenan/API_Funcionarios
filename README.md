API RESTful de Funcionários

Um projeto de gerenciamento de dados de funcionários utilizando **MySQL**, desenvolvida em **Node.js** com **Express**. A API permite realizar operações de CRUD (Create, Read, Update, Delete) nos registros dos funcionários com documentação **Swagger**.

---

## Funcionalidades

- Listar todos os funcionários
- Buscar um funcionário por ID
- Cadastrar um novo funcionário
- Atualizar dados de um funcionário
- Deletar funcionário por ID
- Documentação interativa da API com Swagger

---

##  Tecnologias Utilizadas

- **Node.js**
- **Express**
- **MySQL2**
- **Swagger UI Express**
- **YAMLJS**
- **Nodemon** (para desenvolvimento)

---

##  Requisitos

- Node.js
- MySQL
- npm

---

## Instalação e Execução

1. **Clone o repositório**:

```bash
git clone https://github.com/santrenan/API_Funcionarios.git
cd API_Funcionarios
```

2. **Instale as dependências**:

```bash
npm install
```

3. **Configure o banco de dados**:

Crie a tabela no seu banco MySQL com o seguinte comando:

```sql
CREATE TABLE funcionarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    cargo VARCHAR(50),
    salario FLOAT 
);

```

4. **Edite o arquivo `database.js`** com as configurações corretas:

```js
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'seu_usuario',
    password: 'sua_senha',
    database: 'nome_do_banco'
});

connection.connect((err) =>{
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('conectado ao MySQL com sucesso!');
});

module.exports = connection;
```

5. **Inicie o projeto**:

- Em modo produção:

```bash
npm start
```

- Em modo desenvolvimento (com auto-reload):

```bash
npm run dev
```

---

## 🔌 Endpoints da API

| Método | Rota                  | Descrição                      |
|--------|-----------------------|--------------------------------|
| GET    | `/funcionarios`       | Lista todos os funcionários    |
| GET    | `/funcionarios/:id`   | Busca funcionário por ID       |
| POST   | `/funcionarios`       | Cadastra novo funcionário      |
| PUT    | `/funcionarios/:id`   | Atualiza um funcionário        |
| DELETE | `/funcionarios/:id`   | Deleta um funcionário          |

---

## Documentação Swagger

Acesse a documentação da API em:

📍 [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs)

Arquivo de especificação OpenAPI:

```text
./docs/openapi.yaml
```

---

## 📁 Estrutura do Projeto

```
├── database.js
├── index.js
├── package.json
├── docs/
│   └── openapi.yaml 
```
