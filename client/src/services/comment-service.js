import create from 'services/http-service'
import apiClient from './api-client'

const commentService = create('/comment')

commentService.addComment = id => apiClient.post(`${endpoint}/${id}`)

export default commentService
