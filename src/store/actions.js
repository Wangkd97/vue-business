
//给action注册事件处理函数。
 export function  setUserInfo({commit},user) {
   return commit('setUserinfo',user)
 }
export function  isShowFooterBar({commit},isShow) {
  return commit('isShowFooterBar',isShow)
}
