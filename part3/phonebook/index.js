const express = require('express')
const morgan = require('morgan')
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(morgan("tiny"))
app.use(cors());

morgan.token("body", (req) => {
  return JSON.stringify(req.body)
});

const requestLogger = morgan((tokens, req, res) => {
   console.log("Middleware");
  if(req.method === "GET") return null;
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"), "-",
    tokens["response-time"](req, res), "ms",
    "body:", tokens["body"](req, res)
  ].join(" ");
});

app.use(requestLogger);

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

   
  if (person) {
     response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
  

  if (!request.body) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = {
  ...request.body,
    id: generateId()
  }

  if(!person.name || !person.number){
     return response.status(200).json();
  }

  const personName = persons.find(p => p.name == person.name)

  if(personName){
   return response.status(400).json({
    error: 'name must be unique'
   })
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/info', (request, response) => {
    const nrPeople = persons.length
    response.send(`<p>Phonebook has info for ${nrPeople} people<p/>
        <p>${new Date().toString()}<p/>`)
    
})



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})