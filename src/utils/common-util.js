import deepExtend from './deepExtend'

export const arrayUtil = {
  /**
   *判断一个数组是否为空
   * @returns {boolean}
   */
  isEmpty(arr) {
    return !(arr !== undefined && arr !== null && arr.length > 0)
  },
  /**
   * 从数组中删除指定元素
   * @param array 目标数组
   * @param target 要删除的对象
   * @param id 唯一标识字段
   * @returns {boolean}
   */
  delItem(array, target, id) {
    if (!array) {
      console.error('数组不能为空或者undefined')
      return false
    }
    if (!target) {
      console.error('目标对象不能为空或者undefined')
      return false
    }
    let index = -1
    array.forEach((item, i) => {
      if (item[id] === target[id]) {
        index = i
      }
    })
    if (index !== -1) {
      array.splice(index, 1)
    }
  },
  /**
   * 从简单数组中删除指定元素
   * @param array 目标数组
   * @param target 要删除的对象
   * @returns {boolean}
   */
  delItem2(array, target) {
    if (!array) {
      console.error('数组不能为空或者undefined')
      return false
    }
    if (!target) {
      console.error('目标对象不能为空或者undefined')
      return false
    }
    let index = -1
    array.forEach((item, i) => {
      if (item === target) {
        index = i
      }
    })
    if (index !== -1) {
      array.splice(index, 1)
    }
  }
}

export const util = {
  // 对象深拷贝
  deepExtend: deepExtend,
  copy(obj) { // 对象/数据的浅拷贝
    if (obj instanceof File) {
      return obj
    }
    if (obj == null || typeof (obj) !== 'object' || 'isActiveClone' in obj) {
      return obj
    }

    let temp
    if (obj instanceof Date) {
      temp = new Date(obj.getTime())
      // temp = new obj.constructor() //or new Date(obj)
    } else {
      try {
        temp = obj.constructor()
      } catch (e) {
        temp = obj
      }
    }
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        obj['isActiveClone'] = null
        temp[key] = util.copy(obj[key])
        delete obj['isActiveClone']
      }
    }
    return temp
  }
}
