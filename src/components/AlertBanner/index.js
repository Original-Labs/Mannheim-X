import React from 'react'
import { Alert, Button } from 'antd'
import styled from '@emotion/styled'
import Marquee from 'react-fast-marquee'
import store from 'Store/index.js'

export default props => {
  return (
    <AlertContainer
      banner
      closable
      message={
        <Marquee pauseOnHover gradient={false}>
          {store.getState().banner}
        </Marquee>
      }
    />
  )
}

const AlertContainer = styled(Alert)`
  margin: 0 25px;
`
