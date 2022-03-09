import { Tooltip } from 'antd'
import styled from '@emotion/styled'

const TooltipTitleWrapper = styled('div')`
  font-size: 16px;
  font-weight: 700;
  color: black;
`

export default function TooltipAnt(props) {
  return (
    <Tooltip
      {...props}
      title={<TooltipTitleWrapper>{props.title}</TooltipTitleWrapper>}
      overlayInnerStyle={{
        borderRadius: '14px'
      }}
      color="white"
    >
      {props.children}
    </Tooltip>
  )
}
