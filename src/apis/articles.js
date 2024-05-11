import { apiHelper } from '../utils/helpers'

export default {
  getArticles() {
    return apiHelper.get(`/articles`)
  },
  postArticles(data) {
    return apiHelper.post(`/articles`, { ...data })
  }
}
