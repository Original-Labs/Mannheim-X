import React from 'react'
import { Spin } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import 'antd/es/spin/style/css'
import styled from '@emotion/styled/macro'

const SpinContainer = styled('div')`
  .ant-spin-container::after {
    background: transparent !important;
  }
`

/**
 *
 * @param {
 *          param {boolean} loading 是否加载
 *          param {ReactNode} indicator 加载指示符(自定义icon)
 *          param {number} delay 加载延迟多少秒
 *          param {boolean} spining 是否为加载状态
 *          param {ReactNode} tip 当作包裹元素时,可以自定义描述文案
 *          param {string} wrapperClassName 包装器的类属性
 *        } props
 * @returns
 */
export default function Loading(props) {
  return props.loading ? (
    <SpinContainer>
      <Spin
        {...props}
        indicator={
          <SyncOutlined
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
