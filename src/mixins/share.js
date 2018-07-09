import wepy from 'wepy'

export default class baseMixin extends wepy.mixin {
  data = {
    isShowShareTip: false
  }

  onLoad () {
    wepy.showShareMenu({ withShareTicket: true })
  }
}
