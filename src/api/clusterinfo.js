import request from '@/utils/request'
import qs from "qs"
export function getBusiness(data) {
  return request({
    url: '/redkv/business/list',
    method: 'get',
    params: {data}
  })
}
export function getOneBusiness(data) {
    return request({
        url: '/redkv/business/one',
        method: 'get',
        params: {data}
    })
}
export function getFinishedBusiness(data) {
    return request({
        url: '/redkv/business/finishedlist',
        method: 'get',
        params: {data}
    })
}
export function getBusinessByUid(data) {
    return request({
        url: '/redkv/business/uidlist',
        method: 'get',
        params: {data}
    })
}
export function getBusinessByPid(data) {
    return request({
        url: '/redkv/business/pidlist',
        method: 'get',
        params: {data}
    })
}
export function saveBusiness(data) {
    return request({
        url: '/redkv/business/savelist',
        method: 'post',
        params: data,
        paramsSerializer: params => {
            return qs.stringify(params, {indices: false})
        }
    })
}
export function processBusiness(data) {
    return request({
        url: '/redkv/business/processlist',
        method: 'post',
        data: data
    })
}
export function updateBusiness(data) {
    return request({
        url: '/redkv/business/updatelist',
        method: 'post',
        params: data,
        paramsSerializer: params => {
            return qs.stringify(params, {indices: false})
        }
    })
}
export function isValidClusterName(data) {
    return request({
        url: '/redkv/business/namelist',
        method: 'get',
        params: {data}
    })
}
export function postMsgToUser(data) {
    return request({
      url: '/webhook/msg',
      method: 'post',
      data: data
    })
}

export function getBusinessByLevel(data) {
  return request({
    url: '/redkv/business/levellist',
    method: 'get',
    params: {data}
  })
}

export function updateInfoByName(data) {
    return request({
        url: '/redkv/business/updateinfo',
        method: 'post',
        data: data
    })
  }
