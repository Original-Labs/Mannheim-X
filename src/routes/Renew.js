import React from 'react'
import { Redirect } from 'react-router-dom'

import { useAccount } from '../components/QueryAccount'
import Banner from '../components/Banner'
import { emptyAddress } from '../utils/utils'
import { message } from 'antd'

export default function Renew(props) {
  const account = useAccount()
  if (account !== emptyAddress) {
    return <Redirect to={'/'} />
  }

  return (
    <Banner>
      {// 弹窗提示
      message.warning({
        key: 2,
        content: '正在连接钱包...',
        duration: 2
        // style: { marginTop: '20vh' }
      })}
      {/*You are here because of a transaction you completed. Please login to your*/}
      {/*wallet to be redirected*/}
    </Banner>
  )
}
