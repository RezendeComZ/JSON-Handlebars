const express = require('express')
const uuid = require('uuid')
const router = express.Router()
const membros = require('../../Membros')

// Mostra todos os membros
router.get('/', (req, res) => {
  res.json(membros);
})

// Mostra um único membro
router.get('/:id', (req, res) => {
  let id = parseInt(req.params.id) // Transformando em número, não precisa se usar só "=="
  let unicoMembro = membros.filter(membro => membro.id === id)
  if (unicoMembro.length == 0) {
    res.status(404).send("Nenhum registro encontrado com a id " + id)
  } else {
    res.json(unicoMembro)
  }
})

// Criar um membro
router.post('/', (req, res) => {
  const novoMembro = {
    id: uuid.v4(), // gera uma ID aleatória
    nome: req.body.nome,
    email: req.body.email,
    status: 'online'
  }

  if (!novoMembro.nome || !novoMembro.email) {
    return res.status(400).json( {msg: 'Por favor incluia nome e email'}) // Bloqueia de continua executando o código
  }
  membros.push(novoMembro)
  res.redirect('/')
  // res.json(membros)
})

// Atualizar membro // Poderia ser como no "Mostrar único usuário", mas só para ser diferente
router.put('/:id', (req, res) => {
  const encontrado = membros.some(membro => membro.id === parseInt(req.params.id));
  if (encontrado) {
      const membroAtualizado =  req.body;
      membros.forEach(membro => {
        if (membro.id === parseInt(req.params.id)) {
          // Qual é o problema desse dois jeitos comentados? Talvez queiram atualizar um ou outro
          // membro.nome = req.params.nome;
          // membro.email = req.params.email;

          // Dessa forma aqui vai manter o original se estiver em branco:
          membro.nome = membroAtualizado.nome ? membroAtualizado.nome : membro.nome // If membroAtualiza.nome estiver em preenchido (true), membro.nome = membroAtualizado.nome, se não, continua igual.
          membro.email = membroAtualizado.email ? membroAtualizado.email : membro.email
          res.json( {msg: "Membro atualizado", membro} )
        }
      })
  } else {
      res.status(404).send("Nenhum registro encontrado com a id " + id)
  }
});

// Deletar membro
router.delete('/:id', (req, res) => {
  const encontrado = membros.some(membro => membro.id === parseInt(req.params.id))

  if (encontrado) {
    res.json({
      msg: 'Membro deletado',
      membros: membros.filter(membro => membro.id !== parseInt(req.params.id))
  });
  } else {
    res.status(400).json({msg: `Nenhum membro encontrado com a id ${req.params.id}`})
  }
})

module.exports = router;