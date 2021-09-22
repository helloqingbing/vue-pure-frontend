import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + getToken()
      config.headers['Content-Type'] = 'application/json'
	  /*config.headers['X-Authorization-ST-ID'] = 'redkv-ops'
	  config.headers['X-Authorization-ST-Secret'] = '6cf8c953804550c26ed040fe6688062c'
	  config.headers['Authorization'] = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyOnhpYW9xaXdhbmcxLHVzZXJOYW1lOuaxquWwj-eluu-8iOWunuS5oO-8iSxhbGlhczpudWxsLGVtYWlsOnhpYW9xaXdhbmcxQHhpYW9ob25nc2h1LmNvbSIsImV4cCI6MTc3MzgzODM3Mn0.17Qm0kEGq_S4MdqQS-KHQaFGqeCRDi7-xxBN36y07cTv227QCnFDa6Eq2k2SDq8xG4qYm8K0QAz3MdBemVHz4Q'
      config.headers['X-Authorization-XHS-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bSI6InhpYW9xaXdhbmcxIiwidXNlcm5hbWUiOiLmsarlsI_npbrvvIjlrp7kuaDvvIkiLCJhbGlhcyI6IiIsImF2YXRhciI6IiIsImVtYWlsIjoieGlhb3Fpd2FuZzFAeGlhb2hvbmdzaHUuY29tIiwidHlwZSI6MywiZXhwIjoxNjE5Njk2MDg1LCJpc3MiOiJ4aHN0In0.9rVo4WghcoshY2NY02g7vJWkhJ3FHJ1KQV5AgB_5BRA'
	  */
	}
    return config

  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const code = response.data.code
    if (code === 401) {
      store.dispatch('user/resetToken')
      if (location.href.indexOf('login') !== -1) {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      } else {
        MessageBox.confirm(
          '登录状态已过期，您可以继续留在该页面，或者重新登录',
          '系统提示',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
    } else if (code === 6401) {
      store.dispatch('user/resetToken')
      MessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
      return false
    } else if (code === 400 || code === 403) {
      Message({
        message: response.data.msg,
        type: 'error',
        duration: 5 * 1000
      })
    } else if (code !== 200) {
      // Notification.error({
      //   title: response.data.msg
      // })
      Message({
        message: response.data.msg,
        type: 'error'
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    if (error.message === 'Network Error') {
      Message({
        message: '服务器连接异常，请检查服务器！',
        type: 'error',
        duration: 5 * 1000
      })
      return
    }
    console.log('err' + error) // for debug

    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })

    return Promise.reject(error)
  }
)

export default service
