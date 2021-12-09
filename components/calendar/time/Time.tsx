import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import dayjs from 'dayjs'
import { styled } from '../../../stitches.config'

const SCROLLBAR_SIZE = 4

const StyledScrollArea = styled(ScrollAreaPrimitive.Root, {
  width: 120,
  height: 200,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'row',
  gap: 8,
})

const StyledViewport = styled(ScrollAreaPrimitive.Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
})

const StyledScrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  padding: 2,
  background: '$slate3',
  transition: 'background 160ms ease-out',
  '&:hover': { background: '$slate5' },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },
})

const StyledThumb = styled(ScrollAreaPrimitive.Thumb, {
  flex: 1,
  background: '$slate2',
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 40,
    minHeight: 40,
  },
})

const StyledCorner = styled(ScrollAreaPrimitive.Corner, {
  background: '$slate2',
})

const StyledTime = styled('div', {
  width: '100%',
  height: 40,
  border: '1.5px solid $slate12',
})

const Time = () => {
  const now = dayjs()
  const minutes = now.minute()
  if (minutes < 15) {
    now.set('minutes', 15)
  }
  if (minutes >= 15 && minutes < 30) {
    now.set('minutes', 30)
  }
  if (minutes >= 30 && minutes < 45) {
    now.set('minutes', 45)
  }
  if (minutes >= 45 && minutes < 60) {
    now.set('hours', now.hour() + 1)
  }

  const intervals: string[] = Array.from({
    length: ((24 - now.hour()) * 60) / 15,
  }).map((i, j) => {
    return j.toString()
  })

  return (
    <StyledScrollArea>
      <StyledViewport>
        {intervals.map((i, j) => {
          return <StyledTime key={j}>{i}</StyledTime>
        })}
      </StyledViewport>
      <StyledScrollbar orientation='horizontal'>
        <StyledThumb />
      </StyledScrollbar>
      <StyledScrollbar orientation='vertical'>
        <StyledThumb />
      </StyledScrollbar>
      <StyledCorner />
    </StyledScrollArea>
  )
}

export default Time
