import request from '@/utils/request'
import qs from 'qs'

// login 登陆
export function login(data) {
  return request({
    url: '/api/v1/login',
    method: 'post',
    data
  })
}

// logout 退出
export function logout() {
  return request({
    url: '/api/v1/logout',
    method: 'post'
  })
}

// refreshtoken 刷新token
export function refreshtoken(data) {
  return request({
    url: '/refreshtoken',
    method: 'post',
    data
  })
}

// getInfo 获取用户基本信息
export function getInfo() {
  return request({
    url: '/api/v1/getinfo',
    method: 'get'
  })
}

// getRole 获取用户的Rbac角色
export function getRbacRole(data){
  return request({
    url:'/permission/list',
    method:'get',
    params: data,
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
}
