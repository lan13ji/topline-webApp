/*
 * 专门操作本地存储的 API 模块
 */
export const getItem = (name) => {
  return JSON.parse(window.localStorage.getItem(name))
}

export const setItem = (name, data) => {
  return JSON.parse(window.localStorage.setItem(name, JSON.stringify(data)))
}

export const removeItem = (name) => {
  window.localStorage.removeItem(name)
}
