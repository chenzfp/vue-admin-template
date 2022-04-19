import request from '@/utils/request'

export const menuApi = {
  // 根据系统查询菜单树
  getMenuTreeByCurrentSystem(moduleId) {
    return request({
      url: 'sys/menu/getMenuTreeByCurrentSystem?moduleId=' + moduleId,
      method: 'get'
    })
  }

}
