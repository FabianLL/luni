export type TDay = {
  year: number
  month: number
  dayInMonth: number | null
  weekday: 'MON' | 'DIE' | 'MIT' | 'DON' | 'FRI' | 'SAM' | 'SON' | null
  isCurrentDay?: boolean
  isPast?: boolean
}
