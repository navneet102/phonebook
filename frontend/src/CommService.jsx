import axios from 'axios'
const baseUrl = "http://localhost:3001/api/persons"

const getAll = () => {
    return axios
            .get(`${baseUrl}`)
}

const create = (nameObject) => {
    return axios
            .post(`${baseUrl}`, nameObject)
}

const deletePerson = (id) => {
    return axios
            .delete(`${baseUrl}/${id}`)
}

const updatePerson = (nameObject) => {
    return axios
            .put(`${baseUrl}/${nameObject.id}`, nameObject)
}

export default { getAll, create, deletePerson, updatePerson }