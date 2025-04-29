// pdf 14
const mysql = require('mysql2');


const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root', // ...
    password: '', // ...
    database: 'empresa'
});

connection.connect((err) =>{
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('conectado ao MySQL com sucesso!');
});

module.exports = connection;

