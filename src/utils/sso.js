import axios from 'axios'
import { getToken, setToken } from '@/utils/auth'
import store from '../store'
import router from '../router'
const casServerUrl = process.env.VUE_APP_CASSERVER_URL
const sysDomain = process.env.VUE_APP_SYSDOAMIN
const casLoginUrl = `${casServerUrl}/login`

export default {
  enableCasAuth() {
    //debugger
    const token = getToken()
    if (token) {
      return
    }

    if (this.isCasCallback()) {
      const ticket = this.getTicket()
      this.getAuthInfo(ticket).then(res => {
        if (res.success) {
          store.dispatch('user/login', res).then(() => { })
        } else {
          next('/login')
        }
      })
    } else {
      this.toAuth()
    }
  },
  toAuth() {
    location.href = `${casLoginUrl}?service=${sysDomain}`
  },
  toIndex(path) {
    location.href = sysDomain + '/' + path
  },
  getTicket() {
    var reg = new RegExp('(^|&)ticket=([^&]*)(&|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
  },
  getAuthInfo(ticket) {
    return axios.get(`/cas/internal_validate?service=${sysDomain}&ticket=${ticket}`).then(res => {
      var responseData = res.data
      if (responseData.success) {
        return {
          'success': true,
          'username': responseData.data.name,
          'user_id': responseData.data.user_id,
          'auth_token': responseData.data.auth_token,
          'email':responseData.data.email
        }
      } else {
        return {
          'success': false,
          'username': '',
          'user_id': '',
          'auth_token':'',
          'email':''
        }
      }
    })
  },
  isCasCallback() {
    const url = window.location.href
    return url.indexOf(sysDomain + '/?ticket=') != -1
  },
  logout() {
    location.href = `${casServerUrl}/logout?service=${sysDomain}`
  }
}
