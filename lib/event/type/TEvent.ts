import { Dayjs } from 'dayjs'
import EVENTSTATE from '../state/SEvent'

export type TEvent = {
  date: Dayjs
  state: EVENTSTATE
}
