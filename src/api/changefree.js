import request from '@/utils/request'
import qs from "qs"

export function addChangeFree(data) {
  return request({
    url: '/redkv/devops/changefree/create',
    method: 'post',
    data
  })
}

export function getChangeFreeList(data) {
  return request({
    url: '/redkv/devops/changefree/list',
    method: 'get',
    params: data,
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
}

export function getChangeFreeByTs(data) {
  return request({
    url: '/redkv/devops/changefree/getbyts',
    method: 'get',
    params: data,
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
}

export function getChangeFreeByName(data) {
  return request({
    url: '/redkv/devops/changefree/getbyname',
    method: 'get',
    params: data,
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
}

export function updateChangeFreeByTs(data) {
  return request({
    url: '/redkv/devops/changefree/update',
    method: 'post',
    data
  })
}
