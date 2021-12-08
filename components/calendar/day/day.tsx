import { useState } from 'react'
import { styled } from '../../../stitches.config'

const StyledDay = styled('button', {
  all: 'unset',
  width: 35,
  height: 35,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 4,
  flexDirection: 'column',
  backgroundColor: '$slate2',
  cursor: 'pointer',
  fontWeight: 400,
  lineHeight: 1,
  fontSize: 14,
  borderRadius: '0.125rem',
  border: '1.5px solid transparent',
  // transition: 'border 50ms',
  '&:hover': {
    borderColor: '$slate12',
  },
  variants: {
    isPast: {
      true: {
        backgroundColor: 'transparent',
        opacity: 0.5,
        '&:hover': {
          cursor: 'default',
          borderColor: 'transparent',
        },
      },
    },
    isSelected: {
      true: {
        backgroundColor: '$slate12',
        color: 'White',
      },
    },
  },
})

const StyledDot = styled('span', {
  width: 4,
  height: 4,
  backgroundColor: '$slate12',
  borderRadius: '100%',
  variants: {
    isSelected: {
      true: {
        backgroundColor: 'White',
      },
    },
  },
})

interface IDayProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  day?: number | null
  isCurrentDay?: boolean
  isPast?: boolean
  isSelected?: boolean
}

const Day = ({ day, isCurrentDay = false, isPast = false }: IDayProps) => {
  const [selected, setSelected] = useState<boolean>(false)

  return (
    <>
      {isPast ? (
        <StyledDay isPast={isPast}>{day}</StyledDay>
      ) : (
        <StyledDay
          isPast={isPast}
          isSelected={selected}
          onClick={() => {
            setSelected(!selected)
          }}
        >
          {day}
          {isCurrentDay ? <StyledDot isSelected={selected} /> : null}
        </StyledDay>
      )}
    </>
  )
}

export default Day
