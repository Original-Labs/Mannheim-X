import React from 'react'
import styled from '@emotion/styled/macro'

import mq from 'mediaQuery'
import { hasNonAscii } from '../../utils/utils'

const MainContainer = styled('main')`
  margin-top: 30px;

  ${mq.medium`
    margin-top: 100px;
`}
`

const Main = ({ children }) => (
  <MainContainer hasNonAscii={hasNonAscii()}>{children}</MainContainer>
)

export default Main
