import { apiHelper } from '../utils/helpers'

export default {
  postIdol(idolId) {
    return apiHelper.post(`/followships/${idolId}`)
  },
  deleteIdol(idolId) {
    return apiHelper.delete(`/followships/${idolId}`)
  }
}
