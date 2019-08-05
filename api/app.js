const port = process.env.PORT || 7000

var express = require('express');
var mysql = require('mysql');

var app = express();
app.use(express.json());

app.listen(port, err => {
  if (err) throw err
  console.log(`> Ready On Server http://localhost:${port}`);
});

var dbConnection = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: ''
});

dbConnection.connect((error) => {
  error ? console.log(error) : console.log('Connected to database');
});

dbConnection.query("SET NAMES utf8");

app.get('/', (request, response) => {
  dbConnection.query('SELECT * FROM quizzes',
  (error, data) => error ? 'Error connection' : response.send(data));
});

app.get('/quiz/:id', (request, response) => {
  const idParam = request.params.id;
  
  dbConnection.query(`
    SELECT * FROM
      quizzes
    LEFT JOIN
      questions
    ON
      quizzes.name = questions.quiz_name
    WHERE
      quizzes.id = ${idParam}`,
  (error, data) => error ? 'Error connection' : response.send(data));
});

app.get('/result/quiz/:id', (request, response) => {
  const idParam = request.params.id;
  const { goodAnswers, badAnswers, quizResult } = request.query;

  dbConnection.query(`
    INSERT INTO answers(goodAnswers, badAnswers, result, quizId) VALUES ('${goodAnswers}','${badAnswers}','${quizResult}','${idParam}')`,
  (error, data) => error ? 'Error connection' : response.send(data));
});

app.get('/users/answers', (request, response) => {
  dbConnection.query(`
    SELECT * FROM
      answers`,
  (error, data) => error ? 'Error connection' : response.send(data));
});