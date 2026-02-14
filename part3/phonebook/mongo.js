const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

const url = `mongodb+srv://suelaa223_db_user:8IWtfR2XD4nwegVs@cluster0.borgbzf.mongodb.net/phonebook?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3 
  },
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: 'Blini',
  number: '123',
})

person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})

Person.find({"name": "Blini"}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})

