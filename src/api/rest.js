import Vue from 'vue'
import VueRessource from 'vue-resource'
import root from 'window-or-global'
import user from '../store/user'
import { isNil } from '../service/util'

export const X_ACCESS_TOKEN = 'x-access-token'
export const X_REQUEST_ID = 'x-request-id'

Vue.use(VueRessource)

Vue.http.options.root = root.location ? root.location.origin : 'tests/'

const encode = value => value instanceof Date ? encodeURIComponent(value.toISOString()) : encodeURIComponent(value)

/**
 *
 * @param param => '_ids'
 * @param values => [1,2,3]
 * @returns "_ids=1&_ids=2&_ids=3"
 */
export const arrayOf = (param, values) => {
  const arr = []
  for (let i = 0; i < values.length; i++) {
    arr.push(`${param}=${encode(values[i])}`)
  }
  return arr.join('&')
}

export const paramsOf = params => {
  if (!params) return ''
  const keys = Object.keys(params)
  const arr = []
  for (let i = 0; i < keys.length; i++) {
    const rawValue = params[keys[i]]
    if (!isNil(rawValue)) {
      arr.push(Array.isArray(rawValue) ? arrayOf(keys[i], rawValue) : `${keys[i]}=${encode(rawValue)}`)
    }
  }
  return arr.length > 0 ? '?' + arr.join('&') : ''
}

const token = () => user.state.token && { [X_ACCESS_TOKEN]: user.state.token } || {}
const xRequestId = () => user.state.xRequestId && { [X_REQUEST_ID]: user.state.xRequestId } || {}

export const get = async (url, reqOpts) => (await Vue.http.get(url, { json: true, headers: { ...token(), ...xRequestId() }, ...reqOpts })).body
export const del = (url, reqOpts) => Vue.http.delete(url, { json: true, headers: { ...token(), ...xRequestId() }, ...reqOpts })
export const post = (url, body, reqOpts) => Vue.http.post(url, body, { json: true, headers: { ...token(), ...xRequestId() }, ...reqOpts })
export const put = (url, body, reqOpts) => Vue.http.put(url, body, { json: true, headers: { ...token(), ...xRequestId() }, ...reqOpts })