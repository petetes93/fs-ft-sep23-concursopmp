import create from 'services/http-service'

const commentService = create('/comment')

commentService.addComment = id => apiClient.post(`${endpoint}/${id}`)

export default commentService
