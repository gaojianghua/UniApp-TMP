import http from '../method.js'

// 获取配置
export const getSysConfig = (params, config = {}) => http.get('/api/common/sysConfig', params, config)

// 获取用户信息
export const getUserInfo = (params, config = {}) => http.get('/api/user/info', params, config)
