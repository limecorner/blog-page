import { apiHelper } from '../utils/helpers'

export default {
  getArticles() {
    return apiHelper.get(`/articles`)
  }
}
