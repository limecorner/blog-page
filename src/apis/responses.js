import { apiHelper } from '../utils/helpers'

export default {
  postResponse(articleId, data) {
    return apiHelper.post(`/responses/${articleId}`, { ...data })
  },
  deleteResponse(id) {
    return apiHelper.delete(`/responses/${id}`)
  }
}
