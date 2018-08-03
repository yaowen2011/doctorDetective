import { createAction } from 'redux-actions'
import { GET_USERDATA } from '../types/user-data'
import { getUserData } from '@/api'

export const fetchUserData = createAction(GET_USERDATA, async (params) => {
  let { data } = await getUserData()
  return data
})
