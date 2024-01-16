import create from 'services/http-service'
import apiClient from './api-client'

const endpoint = '/comment'

const commentService = create(endpoint)

commentService.addComment = (id, entity) =>
  apiClient.post(`${endpoint}/${id}`, entity)

export default commentService
