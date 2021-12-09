import {
  CaretLeftIcon,
  CaretRightIcon,
  DividerVerticalIcon,
} from '@radix-ui/react-icons'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import { styled } from '../../stitches.config'
import { Day, TDay } from './day'
import Time from './time/Time'

const getWeekday = (weekday: Number) => {
  switch (weekday) {
    case 0:
      return 'SON'
    case 1:
      return 'MON'
    case 2:
      return 'DIE'
    case 3:
      return 'MIT'
    case 4:
      return 'DON'
    case 5:
      return 'FRI'
    case 6:
      return 'SAM'
    default:
      return null
  }
}

const getDays = (date: Dayjs, initalDate: Dayjs): TDay[] => {
  const totalDaysCurrentMonth = date.daysInMonth()
  let firstDayInCurrentMonth = date.startOf('month').day()
  const totalDaysLastMonth = date.subtract(date.date(), 'day').daysInMonth()

  let days: TDay[] = []
  let daysPlaceholderAmount: Number = 0

  switch (firstDayInCurrentMonth) {
    case 0:
      daysPlaceholderAmount = 6
      break
    case 1:
      daysPlaceholderAmount = 0
      break
    case 2:
      daysPlaceholderAmount = 1
      break
    case 3:
      daysPlaceholderAmount = 2
      break
    case 4:
      daysPlaceholderAmount = 3
      break
    case 5:
      daysPlaceholderAmount = 4
      break
    case 6:
      daysPlaceholderAmount = 5
      break
    default:
      break
  }

  for (let index = 0; index < daysPlaceholderAmount; index++) {
    firstDayInCurrentMonth--
    let day: TDay = {
      year: date.year(),
      month: date.month() - 1,
      dayInMonth: totalDaysLastMonth - index,
      weekday: getWeekday(firstDayInCurrentMonth),
      isCurrentDay: false,
      isPast: true,
    }
    days.push(day)
  }

  days.reverse()

  for (let index = 1; index <= totalDaysCurrentMonth; index++) {
    let day: TDay = {
      year: date.year(),
      month: date.month(),
      dayInMonth: index,
      weekday: null,
      isCurrentDay:
        initalDate.month() === date.month() &&
        initalDate.year() === date.year() &&
        date.date() === index,
    }
    const dayDate = new Date(date.year(), date.month(), index).getUTCDay()

    day.weekday = getWeekday(dayDate)
    days.push(day)
  }

  return days
}

const getMonthname = (month: number) => {
  switch (month) {
    case 1:
      return 'Feb'
    case 2:
      return 'Mär'
    case 3:
      return 'Apr'
    case 4:
      return 'Mai'
    case 5:
      return 'Jun'
    case 6:
      return 'Jul'
    case 7:
      return 'Aug'
    case 8:
      return 'Sep'
    case 9:
      return 'Okt'
    case 10:
      return 'Nov'
    case 11:
      return 'Dez'
    default:
      return 'Jan'
  }
}

const StyledCalendar = styled('div', {
  width: 'fit-content',
  height: 'fit-content',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: 16,
})

const StyledWeekGrid = styled('div', {
  width: '100%',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
  gap: 12,
  textAlign: 'center',
  fontWeight: 300,
  fontSize: 12,
})

const StyledDaysGrid = styled('div', {
  width: '100%',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
  gap: 12,
})

const StyledRowFlex = styled('div', {
  width: 'fit-content',
  height: 'fit-content',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  gap: 8,
})

const StyledRowFlexAuto = styled('div', {
  width: 'fit-content',
  height: 'fit-content',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  gap: 8,
})

const StyledIconButton = styled('button', {
  all: 'unset',
  width: 40,
  height: 40,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
})

const StyledCenter = styled('div', {
  width: 'fit-content',
  height: 40,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const Calendar = () => {
  const [initalDate, setInitalDate] = useState<Dayjs>(dayjs())
  const [date, setDate] = useState<Dayjs>(dayjs())
  const [days, setDays] = useState<TDay[] | null>(null)

  useEffect(() => {
    setDays(getDays(date, initalDate))
  }, [date, initalDate])

  return (
    <StyledCalendar>
      <StyledRowFlex>
        <StyledIconButton
          onClick={() => {
            setDate(date.subtract(1, 'month'))
            setDays(getDays(date, initalDate))
          }}
        >
          <CaretLeftIcon />
        </StyledIconButton>
        <StyledRowFlexAuto>
          {date.year()}
          <StyledCenter>
            <DividerVerticalIcon />
          </StyledCenter>
          {getMonthname(date.month())}
        </StyledRowFlexAuto>
        <StyledIconButton
          onClick={() => {
            setDate(date.add(1, 'month'))
            setDays(getDays(date, initalDate))
          }}
        >
          <CaretRightIcon />
        </StyledIconButton>
      </StyledRowFlex>
      <StyledWeekGrid>
        <span>MON</span>
        <span>DIE</span>
        <span>MIT</span>
        <span>DON</span>
        <span>FRI</span>
        <span>SAM</span>
        <span>SON</span>
      </StyledWeekGrid>
      <StyledDaysGrid>
        {days &&
          days.map((day, i) => {
            return (
              <Day
                day={day.dayInMonth}
                isCurrentDay={day.isCurrentDay}
                isPast={day.isPast}
                key={i}
              />
            )
          })}
      </StyledDaysGrid>
    </StyledCalendar>
  )
}

export default Calendar
