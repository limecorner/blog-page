import { apiHelper } from '../utils/helpers'

export default {
  getArticles() {
    return apiHelper.get(`/articles`)
  },
  getArticle({ id }) {
    return apiHelper.get(`/articles/${id}`)
  },
  postArticles(data) {
    return apiHelper.post(`/articles`, { ...data })
  },
  putArticles(id, data) {
    return apiHelper.put(`/articles/${id}`, { ...data })
  },
  deletArticle(id) {
    return apiHelper.delete(`/articles/${id}`)
  }
}
