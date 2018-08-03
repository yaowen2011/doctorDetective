import { createAction } from 'redux-actions'
import { GET_VIDEO } from '../types/video'
import { getVideo } from '@/api'

export const fetchVideo = createAction(GET_VIDEO, async (params) => {
  let { data } = await getVideo()
  return data
})
