const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const connection = require('./database');

// Configuração CORS
const corsOptions = {
    origin: '*', // Permite qualquer origem. Substitua com o domínio específico em produção
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization', // Cabeçalhos permitidos
    credentials: true, // Permite o envio de cookies, se necessário
};

app.use(cors(corsOptions)); // Usando CORS para todas as rotas


// Adiciona o Swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/openapi.yaml');

// Server para documentação Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Middleware para interpretar JSON
app.use(express.json());

// Rota raiz para teste
app.get('/', (req, res) => {
    res.send('WebAPI com Node.js e MySQL');
});



// Endpoint para listar funcionários (ok) 
app.get('/funcionarios', (req, res) => { 
    connection.query('SELECT * FROM funcionarios', (err, results) => {
        if (err) {
            console.error('Erro ao buscar funcionarios:', err);
            return res.status(500).send('Erro no servidor');
        }
        res.status(200).json(results); // Att por boa prática
    });
});

// Endpoint para listar um funcionário pelo ID (ok)
app.get('/funcionarios/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    } 


    connection.query('SELECT * FROM funcionarios WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Erro ao buscar funcionário:', err);
            return res.status(500).send('Erro no servidor');
        }
        if (result.length === 0) {
            return res.status(404).send('Funcionário não encontrado');
        }
        res.status(200).json(result[0]); // Att por boa prática
    });
});


// Endpoint para criar um novo registro de funcionários (ok)
app.post('/funcionarios', (req, res) => {
    const { nome, cargo, salario } = req.body;
    if (!nome || !cargo || !salario) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const query = 'INSERT INTO funcionarios (nome, cargo, salario) VALUES (?, ?, ?)';
    connection.query(query, [nome, cargo, salario], (err, result) => {
        if (err) {
            console.error('Erro ao inserir funcionários:', err);
            return res.status(500).send('Erro no servidor');
        }
        res.status(201).json({ id: result.insertId, nome, cargo, salario });

    });
});


// Endpoint para atualizar um funcionário (ok)
app.put('/funcionarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, cargo, salario } = req.body;
    if (!id || !nome || !cargo || !salario) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const query = 'UPDATE funcionarios SET nome = ?, cargo = ?, salario = ? WHERE id = ?';
    connection.query(query, [nome, cargo, salario, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar funcionário:', err);
            return res.status(500).send('Erro no servidor');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Funcionário não encontrado.')
        }
        res.status(200).json({ id, nome, cargo, salario });
    });
});


// Endpoint para deletar um Funcionário (ok)
app.delete('/funcionarios/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }


    const query = 'DELETE FROM funcionarios WHERE id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erro ao deletar Funcionário:', err);
            return res.status(500).send('Erro no servidor');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Funcionário não encontrado.')
        }
        res.status(200).json({ message: 'Funcionário removido com sucesso!' });
    });
});


// Inicializando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
