import request from '@/utils/request'
import qs from 'qs'

export function getXHSTreeFormTreeService(data) {
  return request({
    url: '/xhst/tree/platform',
    method: 'get',
    data
  })
}

export function getXhstClusterHosts(data) {
  return request({
    url: '/xhst/instance/list',
    method: 'get',
    params: data,
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
}

export function getDutyData(data) {
  return request({
    url: '/duty/service/search?serviceLine=RedKv',
    method: 'get',
    params: data,
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
}
