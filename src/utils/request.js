import wepy from 'wepy'

// 封装 http 请求
/**
 * request
 * 对小程序 wepy.request 自定义封装，满足一些个性化需求
 * @param url {String} 请求的地址
 * @param params {Object} 请求需要的相关参数，以及一些判定参数
 * @param params.isNeedToken {Boolean} 发送请求时默认需要 token
 * @param params.method {String} 请求方法，默认为 GET 方法
 * @param params.data {Object} 发送请求时需要传带的数据
 * @return res {Object} 请求成功后收到的响应数据，返回一个 Promise 对象
 */
const request = async (url = '', params = {}) => {
  try {
    let res
    let host = wepy.$appConfig.baseUrl
    let token = wepy.getStorageSync('token')
    let { method = 'GET', data = {}, isNeedToken = true } = params

    url = host + url
    res = isNeedToken
      ? await wepy.request({ url, method, data, header: { 'Authorization': `Bearer ${token}` } })
      : await wepy.request({ url, method, data })

    let { statusCode } = res
    if (typeof statusCode === 'undefined' || statusCode !== 200) {
      wepy.showToast({
        title: '服务器异常，请重试',
        icon: 'none'
      })
    }

    return res
  } catch (error) {
    console.log(`error! errUrl: ${url}, errParams:`, params)
  }
}

export default request
