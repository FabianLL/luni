import type { NextPage } from 'next'
import { Calendar } from '../components'
import { styled } from '../stitches.config'

const StyledLayout = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const Home: NextPage = () => {
  return (
    <StyledLayout>
      <Calendar />
    </StyledLayout>
  )
}

export default Home
