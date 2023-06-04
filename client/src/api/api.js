import axios from 'axios'

export const verifyUser = async (values) => {
  const response = await axios.post(
    'http://localhost:4000/api/verifyUser',
    values
  )
  return response.data
}

export const verifyToken = async (token) => {
  const response = await axios.post('http://localhost:4000/api/verifyToken', { token })
  return response.data
}

export const sendEmail = async (email) => {
  const response = await axios.post('http://localhost:4000/api/sendEmail', {
    email
  })
  return response.data
}

export const createPerson = async (values) => {
  const response = await axios.post(
    'http://localhost:4000/api/createPerson',
    values
  )
  return response.data
}

export const getPerson = async (email) => {
  const response = await axios.post('http://localhost:4000/api/getPerson', {
    email
  })
  return response.data
}

export const getCourses = async (id, typeUser) => {
  const response = await axios.post('http://localhost:4000/api/getCourses', {
    id,
    typeUser
  })
  return response.data
}

export const getGrades = async (id) => {
  const response = await axios.post('http://localhost:4000/api/getGrades', {
    id
  })
  return response.data
}

export const getCourse = async (idGroup) => {
  const response = await axios.post('http://localhost:4000/api/getGrade', {
    idGroup
  })
  return response.data
}

export const getStudents = async (idGroup) => {
  const response = await axios.post('http://localhost:4000/api/getStudents', {idGroup})
  return response.data
}

export const getKeys = async () => {
  const response = await axios.get('http://localhost:4000/api/getKeys')
  return response.data
}
