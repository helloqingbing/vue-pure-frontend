import axios from 'axios'
import { getToken, setToken } from '@/utils/auth'
import store from '../store'
import router from '../router'

const casServerUrl = process.env.VUE_APP_CASSERVER_URL
const sysDomain = process.env.VUE_APP_SYSDOAMIN
const casLoginUrl = `${casServerUrl}/login`

/*
Q: 为什么页面会来回跳？

A: 造成这个问题的原因是，sso登录成功了且在cookie中种了对应的登录态，而进入业务系统时业务后端ticket校验失败了
返回401又跳到登录页但是登录页有sso登录态因此又回跳到业务系统往复循环；打开web控制台查看调用customer登录相关接
口时传入的的service和调用业务登录时传入的service是否一致，customer登录相关接口service默认都会encode，因此
需要确保业务系统鉴权时携带的service也进行了encode
*/
export default {
  async enableCasAuth() {
    //debugger
    const token = getToken()
    if (token) {
      return
    }

    if (this.isCasCallback()) {
      const ticket = this.getTicket()
      await this.getAuthInfo(ticket).then(res => {
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
          'userid': responseData.data.user_id,
          'token': responseData.data.auth_token,
          'email':responseData.data.email
        }
      } else {
        return {
          'success': false,
          'username': '',
          'userid': '',
          'token':'',
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
