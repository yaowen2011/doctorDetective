import { handleActions } from 'redux-actions'
import { GET_VIDEO } from '../types'

const initVideo = {
  video: null,           // video以及背景图
  subject: '',           // 当期答题主题
}

export default handleActions(
  {
    [GET_VIDEO] (state, action) {
      let { payload: { data: { subject, video: { data: video } } } } = action
      let len = subject.length
      let subjectBrief = subject

      if (len > 8) subjectBrief = subject.slice(0, 8)

      return {
        ...state,
        subject: subjectBrief,
        video
      }
    }
  },
  {
    ...initVideo
  }
)
