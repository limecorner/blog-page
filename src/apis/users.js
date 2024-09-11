import { apiHelper } from './../utils/helpers'

export default {
  getCurrentUser() {
    return apiHelper.get('/users/current-user')
  },
  getUser(id) {
    return apiHelper.get(`/users/${id}`)
  },
  editUserInfo(id, formData) {
    return apiHelper.put(`/users/${id}`, formData)
  }
}
