import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar, Card, message, Modal, Progress } from 'antd'
import styled from '@emotion/styled/macro'
import './index.css'
import mq from 'mediaQuery'
import { getSNSERC20Exchange, getSNSERC20 } from 'apollo/mutations/sns'
import { ERC20ExchangeAddress } from 'utils/utils'

const { Meta } = Card

export default props => {
  const { poolItem } = props

  const history = useHistory()
  const [modalVisible, setModalVisible] = useState(false)

  // 获取用户绑定的兑换池ID
  const getUserPoolId = async () => {
    const ERC20Exchange = await getSNSERC20Exchange(ERC20ExchangeAddress)
    try {
      const usrPoolId = await ERC20Exchange.getUserPool()
      console.log('usrPoolId:', usrPoolId)
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
        extra={<CardNo className="cardNo">{poolItem.poolId}</CardNo>}
        hoverable
        onClick={async () => {
          const usrPoolId = await getUserPoolId()
          console.log('usrPoolId:', usrPoolId)

          // 用户已经绑定了此认购池,则跳转到认购池详情页面
          if (poolItem.poolId === usrPoolId) {
            history.push({
              pathname: '/SubscriptionPoolDetails',
              state: { details: poolItem }
            })
          } else if (usrPoolId === 0) {
            // 用户未绑定认购池,点击显示弹窗,进行绑定
            if (poolItem.rank !== 100) {
              setModalVisible(true)
            } else {
              message.warning({
                content: '认购池已满'
              })
            }
          } else {
            // 用户如果有绑定认购池,则进行提示
            message.warning({ content: '不能重复绑定认购池' })
          }
        }}
      >
        <Meta
          avatar={<Progress type="circle" percent={poolItem.rank} width={50} />}
          // title={getUserPoolId() }
          description="认购池简要描述内容,认购池简要描述内容,认购池简要描述内容,认购池简要描述内容,认购池简要描述内容"
          style={{ color: 'white' }}
        />
      </CardContainer>
      <Modal
        title="获得认购资格"
        width={300}
        maskClosable={false}
        style={{ top: '30vh' }}
        visible={modalVisible}
        onOk={async () => {
          const ERC20Exchange = await getSNSERC20Exchange(ERC20ExchangeAddress)
          try {
            const isBind = await ERC20Exchange.subscribe(poolItem.poolId)
            console.log('isBind:', isBind)
            history.push({
              pathname: '/SubscriptionPoolDetails',
              state: { details: poolItem }
            })
          } catch (error) {
            console.log('subscribeError:', error)
          }

          setModalVisible(false)
        }}
        okButtonProps={{
          shape: 'round'
        }}
        onCancel={() => {
          setModalVisible(false)
        }}
        cancelButtonProps={{
          shape: 'round'
        }}
      >
        进入该认购池后将自动获得认购资格，该地址兑币
        仅可在此池中进行，无法进入其他认购池进行兑币 。
        当且仅当该池认购已满时，可再加入其他认购池。
      </Modal>
    </>
  )
}

const CardContainer = styled(Card)`
  margin: 10px 0;
  ${mq.medium`
        width:300px;
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
