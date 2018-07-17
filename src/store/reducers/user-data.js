import { handleActions } from 'redux-actions'
import {
  GET_USERDATA,
  INCREMENT_GOLD_ALL,
  DECREMENT_GOLD_ALL
} from '../types'

const initUserDataState = {
  bonus: 0,             // 用户当前总奖金数量
  card: 0,              // 用户当前复活卡数量
  expired: 0,           // 当期知识大通关答题是否结束
  expired_at: '',       // 当期知识大通关答题结束时间
  gold_all: 0,          // 用户当前总金币数量
  honor: '',            // 用户当前称号
  is_answer: 0,         // 用户是否答过了当期的知识大通关
  pid: '',              // 当期知识大通关的 id
  score: 0,             // 用户当前总分数
  t_label: '',          // 当期的知识大通关答题结束时间的提示信息
  total_bonus: 0,       // 当期知识大通关的 奖金池
  uid: '',              // 用户 id
  preview_url: '',      // 预习资料链接
  userInfo: {}          // 用户微信个人信息（头像、昵称）
}

export default handleActions(
  {
    [GET_USERDATA] (state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    [INCREMENT_GOLD_ALL] (state, { payload }) {
      return {
        ...state,
        gold_all: state.gold_all + payload
      }
    },
    [DECREMENT_GOLD_ALL] (state, { payload }) {
      return {
        ...state,
        gold_all: state.gold_all - payload
      }
    }
  },
  {
    ...initUserDataState
  }
)
