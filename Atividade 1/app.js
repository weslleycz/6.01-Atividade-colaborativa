const http = require("http");
const path = require("path");
const express = require("express");
const logger = require("morgan");
const open = require('open');
const bodyParser = require("body-parser");

const app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

// cria um vetor global para conter as entradas
let entries = [];
let detailing=[];
const msg = [' pessoa deixou ', ' pessoas deixaram '];
// torna o vetor acessível em todas as views
app.locals.entries = entries;
app.locals.msg = msg;
app.locals.detailing=detailing;

// inicializa o logger com nível dev
app.use(logger('dev'));
// inicializa uma variável req.body, caso o usuário
// submeta um formulário
app.use(bodyParser.urlencoded({ extended: false }));

// definição dos roteadores (rotas)

app.get('/', (request, response) => {
    //console.log(entries);
    // views/index.ejs
    response.render('index');
});

app.get('/new-entry', (request, response) => {
    response.render('new-entry');
});

app.get('/detailingset/:index', (request, response) => {
   detailing.push(entries[request.params.index])
    return response.json({
        status: "ok",
        has_error: false,
      });
})

app.get('/detailing',(request, response) => {
    console.log(detailing);
    response.render('detailing');
});


app.post('/new-entry', (request, response) => {
    if (!request.body.title || !request.body.body) {
        resonse.status(400).send('As postagens devem ter um título de um corpo.');
        return;
    }
    entries.push({
        title: request.body.title,
        content: request.body.body,
        published: new Date()
    });

    response.redirect('/');
});

app.use((request, response) => {
    response.status(404).render('404');
});

http.createServer(app).listen(3000,
   async function(){
    console.log(`Server running on port ${3000}`);
    await open('http://localhost:3000');                          
});
