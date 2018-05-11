import wepy from 'wepy'

// 封装 http 请求
const request = async (url, params = {}) => {
  try {
    let { isNeedToken = true, isLoading = false, toastOptions = {} } = params
    switch (isNeedToken) {
      case true:                                    // 请求时，需要带着 token
        let token = wepy.getStorageSync('token')
        if (token.length === 0) {                   // token 不存在时，重新登陆获取 token
          await getLoginToken()
          let { code } = await wepy.login()
          let { data: { newToken } } = await wepy.request({ url: 'https://case.geekheal.net/api/user/login', data: { code } })
          wepy.setStorageSync('token', newToken)
        } else {
          if (isLoading) {                        // 发起请求时，显示默认加载提示
            let { title = '加载中', mask = true } = toastOptions
            wepy.showLoading({ title, mask })
          }
          let { method = 'GET', data = {} } = params
          let res = await wepy.request({ url, method, data, header: { 'Authorization': `Bearer ${token}` } })
          if (isLoading) wepy.hideLoading()
          return res
        }
        break
      case false:
        if (isLoading) {                        // 发起请求时，显示默认加载提示
          let { title = '加载中', mask = true } = toastOptions
          wepy.showLoading({ title, mask })
        }
        let { method = 'GET', data = {} } = params
        let res = await wepy.request({ url, method, data })
        if (isLoading) wepy.hideLoading()
        return res
    }
  } catch (error) {
    console.log(`error! errUrl: ${url}, errParams:`, params)
  }
}

export {
  request
}
