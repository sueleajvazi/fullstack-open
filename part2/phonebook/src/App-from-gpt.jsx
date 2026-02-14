import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // ✅ Fetch persons on mount
  useEffect(() => {
    personService.getAll().then(data => {
      setPersons(data)
    })
  }, [])

  // ✅ Derived filtered list (DO NOT store in state)
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  // ✅ Add or update person
  const handleSubmit = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(
      person => person.name === newName
    )

    if (existingPerson) {
      const updatedPerson = {
        ...existingPerson,
        number: newNumber
      }

      personService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(prev =>
            prev.map(p =>
              p.id !== existingPerson.id ? p : returnedPerson
            )
          )
          setNewName('')
          setNewNumber('')
        })
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(prev => prev.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  // ✅ Delete person
  const handleDelete = (id) => {
    personService.remove(id).then(() => {
      setPersons(prev =>
        prev.filter(person => person.id !== id)
      )
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {/* 🔍 Filter */}
      <div>
        filter shown with:
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* ➕ Add / Update */}
      <h3>Add or Update</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>

      {/* 📋 List */}
      <h3>Numbers</h3>
      {personsToShow.map(person => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>
            delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default App
