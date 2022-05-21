import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar, Card, message, Modal, Progress } from 'antd'
import styled from '@emotion/styled/macro'
import './index.css'
import mq from 'mediaQuery'
import { getSNSERC20Exchange, getSNSERC20 } from 'apollo/mutations/sns'
import { ERC20ExchangeAddress } from 'utils/utils'
import { isReadOnly } from 'contracts'

const { Meta } = Card

export default props => {
  const { poolItem } = props

  const history = useHistory()

  // 获取用户绑定的兑换池ID
  const getUserPoolId = async () => {
    const ERC20Exchange = await getSNSERC20Exchange(ERC20ExchangeAddress)
    try {
      const usrPoolId = await ERC20Exchange.getUserPool()
      return parseInt(usrPoolId._hex, 16)
    } catch (error) {
      console.log('getUserPoolError:', error)
      return 0
    }
  }

  return (
    <>
      <CardContainer
        title={
          <>
            <Avatar src={poolItem.avatar} />
            <Title> {poolItem.title}</Title>
          </>
        }
        extra={<CardNo className="cardNo">{poolItem.poolWord}</CardNo>}
        hoverable
        onClick={async () => {
          if (!isReadOnly()) {
            const usrPoolId = await getUserPoolId()
            if (usrPoolId !== 0 && poolItem.poolId !== usrPoolId) {
              message.warning({ content: '已绑定其他认购池,无法进入该池' })
            }
            if (poolItem.rank === 100) {
              message.warning({
                content: '认购池已满'
              })
            }
            if (usrPoolId === 0 || usrPoolId === poolItem.poolId) {
              history.push({
                pathname: `/SubscriptionPoolDetails/${poolItem.poolId}`
              })
            }
          } else {
            message.warning({ content: '请连接钱包!' })
          }
        }}
        style={{ backgroundColor: poolItem.backColor }}
      >
        <Meta
          avatar={<Progress type="circle" percent={poolItem.rank} width={50} />}
          // title={getUserPoolId() }
          description="Mannheim X认购开启"
          style={{ color: 'white' }}
        />
      </CardContainer>
    </>
  )
}

const CardContainer = styled(Card)`
  margin: 10px 0;
  ${mq.medium`
        width:300px !important;
        margin:10px;
    `}
  &:hover {
    margin-bottom: 9px;
  }
`

const CardNo = styled('div')`
  width: 34px;
  height: 34px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  line-height: 34px;
  border: 2px solid white;
  border-radius: 50%;
`
const Title = styled('div')`
  display: inline-block;
  height: 32px;
  margin-left: 10px;
  line-height: 32px;
`
