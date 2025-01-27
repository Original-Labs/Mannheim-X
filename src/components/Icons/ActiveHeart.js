import React from 'react'
import styled from '@emotion/styled/macro'

const Heart = ({ active, className }) => (
  <HeartContainer width="25" height="24" active={active} className={className}>
    <path
      d="M10.555 2.695C8.47.436 5.123.437 3.038 2.695l-.2.216c-2.45 2.654-2.45 6.991-.001 9.644l9.62 10.42c.03.034.054.034.086 0l9.619-10.42c2.451-2.654 2.45-6.988-.002-9.644l-.2-.216c-2.086-2.26-5.43-2.26-7.517 0l-.817.884a1.525 1.525 0 0 1-2.253 0l-.818-.884z"
      stroke="#E7E7E7"
      strokeWidth="2"
      fill="none"
      fillRule="evenodd"
    />
  </HeartContainer>
)

const HeartContainer = styled('svg')`
  vertical-align: middle;
  path {
    fill: #ea6060;
    stroke: #ea6060;
    transition: 0.2s ease-out;
  }

  &:hover {
    path {
      fill: none;
      stroke: #e7e7e7;
    }
  }
`

export default Heart
