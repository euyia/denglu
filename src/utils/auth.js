import Cookies from 'js-cookie'

const TokenKey = 'xy_ops'

export function getToken(key) {
  return Cookies.get(key || TokenKey)
}

export function setToken(token, key) {
  return Cookies.set(key || TokenKey, token)
}

export function removeToken(key) {
  return Cookies.remove(key || TokenKey)
}
