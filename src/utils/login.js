import wepy from 'wepy'
import { auth } from './auth'
// 微信登录，获取 code 和 encryptData
const getLoginCode = async () => {
  try {
    let { code } = await wepy.login()

    try {
      let { iv, encryptedData, userInfo } = await wepy.getUserInfo()
      return { code, encryptedData, iv, userInfo }
    } catch (error) {
      // 用户拒绝授权后，打开设置，让用户进行授权
      let modal = await wepy.showModal({
        title: '提示',
        content: ' 您已拒绝授权，请重新点击并授权'
      })
      // 用户关闭modal,直接return
      if (!modal.confirm) return
      let res = await wepy.openSetting()
      // 用户打开设置，但未授权，直接return
      if (!res.authSetting['scope.userInfo']) return
      let { iv, encryptedData, userInfo } = await wepy.getUserInfo()
      return { code, encryptedData, iv, userInfo }
    }
  } catch (error) {
    console.log('获取code失败,微信登录失败，请检查网络状态', error)
  }
}

// 进行服务器登录，以获得登录会话
const getLoginToken = async (params = {}, callback = () => {}) => {
  // 利用iv和encryptedData去服务器换取token
  try {
    let { share_uid = '' } = params
    let { code, iv, encryptedData, userInfo } = await getLoginCode()
    let { data: { bonus, card, expired, expired_at, honor, is_answer, pid, score, token, total_bonus, uid } } = await wepy.request({ url: auth, data: { code, iv, encryptedData, share_uid } })
    wepy.setStorageSync('userInfo', userInfo)
    wepy.setStorageSync('token', token)
    wepy.setStorageSync('uid', uid)
    callback()
    return { userInfo, bonus, card, expired, expired_at, honor, is_answer, pid, score, token, total_bonus, uid }
  } catch (error) {
    console.log('未能获取token:', error)
  }
}
export {
  getLoginToken
}
