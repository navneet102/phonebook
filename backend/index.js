import express from "express"
import morgan from "morgan"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

app.get('/api/persons', (request, response) => {
    response.json(data)
})

app.get('/info', (request, response) => {
    const currentTime = Date()
    const resToSend = `Phonebook has info for ${data.length} people <br /> ${currentTime}`
    response.send(resToSend)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = data.find((person) => (person.id === id))

    if(!person){
        return response.status(400).json({
            error: "ID not found"
        })
    }
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = data.find((person) => (person.id === id))

    if(!person){
        return response.status(400).json({
            error: "ID not found"
        })
    }
    data = data.filter((person) => (person.id !== id))
    response.send("Deleted")
})

app.post('/api/persons', (request, response) => {
    const person = request.body

    if(!person){
        response.status(400).json({
            error: "No details present"
        })
    }

    const newId = getId()

    const newPerson = {
        id: newId,
        name: person.name,
        number: person.number
    }

    data = data.concat(newPerson)

    response.send("Added person")
})

let data = [
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

const getId = () => {
    const maxId = (data.length>0) ? (Math.max(...data.map((person) => (Number(person.id)))))
        : 0

    return String(maxId+1) 
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})