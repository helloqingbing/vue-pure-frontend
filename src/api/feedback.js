import request from '@/utils/request'
import qs from "qs"

export function getFeedback(data) {
  return request({
    url: '/redkv/feedback/list',
    method: 'get',
    params: {data}
  })
}

export function saveFeedback(data) {
    return request({
        url: '/redkv/feedback/savelist',
        method: 'post',
        params: data,
        paramsSerializer: params => {
            return qs.stringify(params, {indices: false})
        }
    })
}
