import { apiHelper } from '../utils/helpers'

export default {
  getArticles(queryString) {
    // console.log('queryString', queryString)
    const path = queryString ? `/articles${queryString}` : '/articles'
    return apiHelper.get(path)
    // return apiHelper.get(`/articles?userId=36&categoryId=6`)
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
