require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require("cors")
const app = express()
const Person = require("./models/person")

app.use(express.json())
app.use(morgan("tiny"))

// Allow all origins
app.use(cors());
app.use(express.static('dist'))

morgan.token("body", (req) => {
  return JSON.stringify(req.body)
});

const requestLogger = morgan((tokens, req, res) => {
  console.log("Middleware");
  if (req.method === "GET") return null;
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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}



app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(result => {
    response.json(result)
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndRemove(id)
    .then(person => {
      if (person) {
        response.status(204).end()
      } else {
        response.status(404).end()
      }
    })  
    .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {


  if (!request.body) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const person = {
    ...request.body
  }

  if (!person.name || !person.number) {
    return response.status(400).json({
      error: 'name or number is missing'
    });
  }


  Person.findOne({ name: person.name }).then(existingPerson => {
    if (existingPerson) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }
    const newPerson = new Person(person)
    newPerson.save().then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
  })
  .catch(error => next(error))
  })




  app.get('/info', (request, response, next) => {
    Person.find({}).then(result => {
      response.send(`<p>Phonebook has info for ${result.length} people<p/>
        <p>${new Date().toString()}<p/>`)
    })
    .catch(error => next(error))
  })

  app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id

    const person = {
    ...request.body
  }

   Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: "query"
   })
    .then(updatedPerson => {
      if(updatedPerson){
          return response.json(updatedPerson)
      }
    })
   
   .catch(error => next(error))

  })

  

 app.use(errorHandler)

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })