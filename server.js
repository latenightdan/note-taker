const fs = require('fs');
const express = require('express');
let { notes } = require('./data/notes.json');

const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('./Develop/public/'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'))
})

app.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    let results = notes;
    console.log(req.query)
    res.json(results);
  });
 


app.post('/api/notes', (req, res) => {

    req.body.id = notes.length.toString();
    const note = createNote(req.body, notes);
    res.json(note);
    
  });

  function createNote(body, array) {
    const note = body;
    array.push(note);
    fs.writeFileSync(
        path.join(__dirname, './data/notes.json'),
        JSON.stringify({ notes: array }, null, 2)
      );
return note;
}

app.delete('/api/notes/:id', function (req, res) {

  const params = req.params.id;
  
  const result = notes.filter(note => note.id != params);
  notes = result;
  console.log(notes);
  fs.writeFileSync(
    path.join(__dirname, './data/notes.json'),
    JSON.stringify({ notes }, null, 2)
  );

  res.send('Got a DELETE request at /user')
})

  app.listen(3001, () =>{
    console.log(`API server now on port ${PORT}`);
});

module.exports = app;