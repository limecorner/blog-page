import { apiHelper } from '../utils/helpers'

export default {
  postResponse(articleId, data) {
    return apiHelper.post(`/responses/${articleId}`, { ...data })
  },
  putResponse(id, data) {
    return apiHelper.put(`/responses/${id}`, { ...data })
  },
  deleteResponse(id) {
    return apiHelper.delete(`/responses/${id}`)
  }
}
