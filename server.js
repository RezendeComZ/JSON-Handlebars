const express = require('express');
const path = require('path');
const app = express();
var exphbs  = require('express-handlebars');
const logador = require('./middleware/logador') // Middleware
const membros = require('./Membros') // Sendo usado somente no "Rota da home"

// Inicia o middleware
// app.use(logador);

// Middleware Handlebars (view engine)
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// Body parser Middleware: 
app.use(express.json()) // Pra lidar com JSON RAW
app.use(express.urlencoded({extended: false})) // Lidar com a submissões de formulários

// Rota da home // se isso stá em cima do Static ele tem prioridade
app.get('/', (req, res) => {
  res.render('index', {titulo: 'Aplicativo dos membros', membros})
})
/* Deix
ando uma pasta inteira no Static sem precisar definir as rotas: */
app.use(express.static(path.join(__dirname, 'public')));

// Router de API/Membros
app.use('/api/membros', require('./routes/api/membros'))


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

const PORT = process.env.PORT || 5000; //
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))