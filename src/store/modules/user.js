import { login, logout, getInfo, refreshtoken, getRbacRole } from '@/api/user'
import { getToken, setToken, setUserName, getUserName, removeToken, setEmail, getEmail, getRole, setRole } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import storage from '@/utils/storage'
import cas from '@/utils/sso'

const state = {
  token: getToken(),
  name: '',
  id: '',
  avatar: '',
  introduction: '',
  email: '',
  roles: [],
  permissions: [],
  permisaction: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_AVATAR: (state, avatar) => {
    if (avatar.indexOf('http') !== -1) {
      state.avatar = avatar
    } else {
      state.avatar = process.env.VUE_APP_BASE_API + avatar
    }
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_PERMISSIONS: (state, permisaction) => {
    state.permisaction = permisaction
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      console.log("login succeed, response data: " + JSON.stringify(userInfo))

      commit('SET_NAME', userInfo.username)
      setUserName(userInfo.username)
      commit('SET_EMAIL', userInfo.email)
      commit('SET_TOKEN', userInfo.token)
      setToken(userInfo.token)
      var roleParams = {
        appName: 'redkvops',
        userName: userInfo.email.replace("@xiaohongshu.com", ""),
      }
      getRbacRole(roleParams).then(response => {
        var roles = []
        if(response.data.length > 0){
          var roles = ['admin']
        }
        //commit('SET_ROLES', roles)
        //setRole(roles[0])
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
    /*
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        const { token } = response
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })*/
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        if (!response || !response.data) {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        }

        const { name, avatar } = response.data

        commit('SET_NAME', getUserName())
        commit('SET_AVATAR', avatar)
        //commit('SET_INTRODUCTION', introduction)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 退出系统
  LogOut({ commit, state }) {
    // Promise最大的好处是在异步执行的流程中，把执行代码和处理结果的代码清晰的分离了
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_PERMISSIONS', [])
        removeToken()
        storage.clear()
        cas.logout()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 刷新token
  refreshToken({ commit, state }) {
    return new Promise((resolve, reject) => {
      refreshtoken({ token: state.token }).then(response => {
        const { token } = response
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
