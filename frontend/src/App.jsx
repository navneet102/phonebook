import { useState, useEffect } from 'react'
import axios from 'axios'
import commService from './CommService'

import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'

import "./app.css"

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [viewAll, setViewAll] = useState(true)
  const [errMsg, setErrMsg] = useState(null)
  const [errColor, setErrColor] = useState('green')

  useEffect(() => {
    commService.getAll()
      .then((response) => {
          setPersons(response.data)
      })
  }, [])

  const personsToShow = viewAll 
  ? persons 
  : persons.filter((person) => (person.name.includes(searchName)))

  const addPerson = (event) => {
    event.preventDefault()

    const alreadyPresentPerson = persons.find((element) => (element.name === newName))
    if(alreadyPresentPerson !== undefined) {

      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        const updatedPerson = {...alreadyPresentPerson, number: newNumber}
        setPersons(persons.map((p) => (p.name !== newName ? p : updatedPerson)))
        commService.updatePerson(updatedPerson)
          .catch(error => {
            setPersons(persons.filter((person) => person.name !== alreadyPresentPerson.name))

            setErrColor("red")
            setErrMsg(`Information of ${alreadyPresentPerson.name} has already been removed from server`)
            setTimeout(() => {
              setErrMsg(null)
              setErrColor("green")
            }, 5000)
          })
      }

      setNewName('')
      setNewNumber('')
      return
    }

    const nameObject = {
      name: newName,
      number: newNumber
    }

    commService.create(nameObject)
      .then((response)=>{
        // console.log(response.data)
        setPersons(persons.concat(response.data))

        setErrMsg(`Added ${newName}`)
        setTimeout(() => {
          setErrMsg(null)
        }, 5000)

        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
    if(event.target.value === '') setViewAll(true)
    else setViewAll(false)
  }


  function handlePersonDelete(person){
    if(!window.confirm(`Delete ${person.name}?`)) return
    commService.deletePerson(person.id)
      .then((response) => {
        setPersons(persons.filter((prevPerson) => (prevPerson.id !== person.id)))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errMsg} color={errColor}/>
      <Filter searchName={searchName} handleSearchNameChange={handleSearchNameChange}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handlePersonDelete={handlePersonDelete}/>
    </div>
  )
}

export default App