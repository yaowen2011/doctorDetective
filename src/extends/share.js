import wepy from 'wepy'
import ShareMixin from '@/mixins/share'

export default class SharePage extends wepy.page {
  mixins = [
    ShareMixin,
  ]

  watch = {
    async isShowShareTip (newVale) {
      if (!newVale) return

      let { confirm } = await wepy.showModal({
        title: '分享提示',
        content: '当其他小伙伴从你的分享卡片进来后，双方可各得一个随机道具',
        showCancel: false
      })

      if (!confirm) return
      this.isShowShareTip = false
      this.$apply()
    }
  }

  onShareAppMessage () {
    this.isShowShareTip = true
    this.$apply()
    return {
      title: '参与医学知识竞答，赢现金大奖！',
      path: `/pages/home/home?share_uid=${this.uid}`,
      imageUrl: '/images/poster.png'
    }
  }
}
