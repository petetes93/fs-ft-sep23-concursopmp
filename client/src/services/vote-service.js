import apiClient from './api-client'
import create from 'services/http-service'

const endpoint = '/vote'

const voteService = create(endpoint)

voteService.addVote = (id, entity) =>
  apiClient.post(`${endpoint}/${id}`, entity)

export default voteService
