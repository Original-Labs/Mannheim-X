import React from 'react'
import { Alert } from 'antd'
import styled from '@emotion/styled'
import Marquee from 'react-fast-marquee'

export default () => {
  return (
    <AlertContainer
      banner
      closable
      message={
        <Marquee pauseOnHover gradient={false}>
          I can be a React component, multiple React components, or just some
          text.
        </Marquee>
      }
    />
  )
}

const AlertContainer = styled(Alert)`
  margin: 0 auto;
`
