import { slate } from '@radix-ui/colors'
import { createStitches } from '@stitches/react'

export const { styled, css } = createStitches({
  theme: {
    colors: {
      ...slate,
    },
  },
})
