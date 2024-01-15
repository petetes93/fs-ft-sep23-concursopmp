import create from 'services/http-service'
import apiClient from './api-client'

const endpoint = '/design'

const designService = create(endpoint)

designService.showDesign = id => apiClient.put(`${endpoint}/showdesign/${id}`)
designService.hideDesign = id => apiClient.put(`${endpoint}/hidedesign/${id}`)

export default designService
