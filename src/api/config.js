import Vue from 'vue'

export const STATUS_OK = 200
export const MODULE_ID = 6 // 当前系统的系统ID
export const baseURL = process.env.VUE_APP_BASE_API === undefined ? '/' : process.env.VUE_APP_BASE_API

Vue.prototype.$baseURL = baseURL
