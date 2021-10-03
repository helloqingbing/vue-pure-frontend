import request from '@/utils/request'
import qs from 'qs'

export function getRepoList(data) {
  return request({
    url: '/redkv/build/repolist',
    method: 'get',
    data
  })
}

export function putRepo(data) {
  return request({
    url: '/redkv/build/saverepo',
    method: 'post',
    params: data,
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
   })
}

export function getBuiltGit(data) {
  return request({
    url: '/redkv/devops/build/builtgit',
    method: 'get',
    params: {data}
  })
}

export function getBuildLog(data) {
  return request({
    url: '/redkv/devops/build/getbuildlog',
    method: 'get',
    params: {data}
  })
}
