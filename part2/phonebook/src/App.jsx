import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from "./components/Person"
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'  



const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNr, setNewNr] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError]  = useState(null);

      useEffect(() => {
    console.log('effect')
          personService.getAll()
          .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
      })
    
      
      
  }, [])

    const deletePerson = (id) => {
      console.log(`deleting person with ${id}`)
      const toDeletePerson = persons.find(person => person.id === id)
      if (!window.confirm(`Delete ${toDeletePerson.name} ?`)) {
      return
} 
      personService.deletePerson(id).then(deletedPerson => {
         setPersons(persons.filter(person => person.id != deletedPerson.id))
      })
  }

    const personsToShow = persons && persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
   
    const addName = (event) => {
    event.preventDefault()

     const personObject = {
      name:newName,
      number: newNr,
    }

    const personFound = persons.find(person => person.name == newName)
    

    if(personFound){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) ){


          personService
     .update(personFound.id , personObject)
     .then(response => {
      setPersons(persons.map(person => {
        if(person.id == personFound.id){
          return response
        } else {
            return person
          }
      }))
     setNewName('');
      setNewNr('');
       setMessage(`Updated ${newName}`)
         setTimeout(() => {
          setMessage(null)
        }, 5000)
    })
    .catch((error) => {

      setError(
          `Note '${newName}' was already removed from server`
        )
        setTimeout(() => {
          setError(null)
        }, 5000)
    })

    return 
      } 
    }

      personService
      .create(personObject)
    .then(response => {
      setPersons(persons.concat(response))
     setNewName('');
      setNewNr('');
      setMessage(`Added ${newName}`)
         setTimeout(() => {
          setMessage(null)
        }, 5000)
    })  
  }

   

   const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNrChange = (event) => {
    console.log(event.target.value)
    setNewNr(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)

  }


  return (
    <div>
      <h2>Phonebook</h2>
      {(message || error ) && (
            <Notification message={message ? message : error}
            isSuccess={message ? true : false}/>
      )}
      
       <div>
        filter shown with: <Filter handleFilter = {handleFilter}/> 
       </div>
      <h2>add a new</h2>
      {/* <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>number: <input value={newNr} onChange={handleNrChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> */}

      <PersonForm newName={newName}
       newNr={newNr}
       addName={addName}
       handleNameChange={handleNameChange}
       handleNrChange={handleNrChange}
      />
      <h2>Numbers</h2>
      {personsToShow && personsToShow.map((person, i) => <Person key={i} name={person.name} number={person.number} deletePerson={() => deletePerson(person.id)}/>)}
     
    </div>
  )
}

export default App