import create from 'services/http-service'

const voteService = create('/vote')

voteService.addVote = id => apiClient.post(`${endpoint}/${id}`)

export default voteService
