
//给action注册事件处理函数。
 export function  setUserInfo({commit},user) {
   return commit('setUserinfo',user)
 }
export function  isShowFooterBar({commit},isShow) {
  return commit('isShowFooterBar',isShow)
}
export function setIsShowFooterBar({commit},isshow) {
  return commit('setIsShowFooterBar',isshow)
}

export function setProductList({commit},productList) {
  return commit('setProductList',productList)
}

export function setProduct({commit},product) {
  return commit('setProduct',product)
}

export function setKeyword({commit},keyword) {
  return commit('setKeyword',keyword)
}

export function setCategoryId({commit},categoryId) {
  return commit('setCategoryId',categoryId)
}

export function setOrderStatus({commit},orderStatus) {
  return commit('setOrderStatus',orderStatus)
}

export function setJudgeAddress({commit},judgeAddress) {
  return commit('setJudgeAddress',judgeAddress)
}

export function setChangeAddress({commit},changeAddress) {
  return commit('setChangeAddress',changeAddress)
}

export function setAddress({commit},address) {
  return commit('setAddress',address)
}



export function setOrderNo({commit},orderNo) {
  return commit('setOrderNo',orderNo)
}
export function setdingdanNo({commit},dingdanNo) {
  return commit('setdingdanNo',dingdanNo)
}
export function setaddressId({commit},addressId) {
  return commit('setaddressId',addressId)
}


