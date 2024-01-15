import create from 'services/http-service'
import apiClient from './api-client'

const endpoint = '/contest'

const contestService = create(endpoint)

contestService.activate = () => apiClient.put(`${endpoint}/`)
contestService.desactivate = id => apiClient.put(`${endpoint}/delete/${id}`)

export default contestService
