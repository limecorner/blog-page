import axios from 'axios'
import Swal from 'sweetalert2'

// const baseURL = 'http://localhost:3000/api'
const baseURL = 'https://my-blog-backend.fly.dev/api'

const axiosInstance = axios.create({
  baseURL
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (err) => Promise.reject(err)
)

export const apiHelper = axiosInstance

export const Toast = Swal.mixin({
  toast: true,
  showConfirmButton: false,
  timer: 3000
})

const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export const relativeTimeFromNow = (a) => dayjs(a).fromNow()
export const currentYear = () => dayjs().year()
