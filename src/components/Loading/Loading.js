import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import 'antd/es/spin/style/css'
import styled from '@emotion/styled/macro'

const SpinContainer = styled('div')`
  .ant-spin-container::after {
    background: transparent !important;
  }
`

export default function Loading(props) {
  return props.loading ? (
    <SpinContainer>
      <Spin
        {...props}
        indicator={
          <LoadingOutlined
            spin
            style={{
              color: props.defaultColor ? props.defaultColor : '#ea6060'
            }}
          />
        }
      >
        {props.children}
      </Spin>
    </SpinContainer>
  ) : (
    props.children
  )
}
