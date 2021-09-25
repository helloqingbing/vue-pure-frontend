import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserName() {
  return Cookies.get('UserName')
}

export function setUserName(name) {
  return Cookies.set('UserName', name)
}

export function getUserID() {
  return Cookies.get('UserID')
}

export function setUserID(id) {
  return Cookies.set('UserID', id)
}

export function getEmail() {
  return Cookies.get('Email')
}

export function setEmail(email) {
  return Cookies.set('Email', email)
}

export function getRole() {
  return Cookies.get('Role')
}

export function setRole(role) {
  return Cookies.set('Role', role)
}
