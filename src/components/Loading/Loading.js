import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import 'antd/es/spin/style/css'

export default function Loading(props) {
  return (
    <Spin
      {...props}
      indicator={
        <SyncOutlined
          spin
          style={{ color: props.defaultColor ? props.defaultColor : '#ea6060' }}
        />
      }
    >
      {props.children}
    </Spin>
  )
}
