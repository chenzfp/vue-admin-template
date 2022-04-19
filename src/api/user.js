import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sso/logins',
    method: 'post',
    data,
    transformRequest: [
      function(data) {
        const fd = new FormData()
        Object.keys(data).forEach(function(key) {
          fd.append(key, data[key])
        })
        fd.append('validCode', data.verifyCode)
        return fd
      }
    ]
  })
}

export function getInfo(token) {
  return request({
    url: '/sys/user/getUserDetail',
    // url: '/vue-admin-template/user/info',
    method: 'get'
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/sso/logout',
    method: 'post'
  })
}
