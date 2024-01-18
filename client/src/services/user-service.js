import apiClient from './api-client'
import create from 'services/http-service'

const endpoint = '/user'

const userService = create(endpoint)

userService.banUser = (id) => apiClient.put(`${endpoint}/delete/${id}`)

export default userService
