import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar, Card, message, Modal, Progress } from 'antd'
import styled from '@emotion/styled/macro'
import './index.css'
import mq from 'mediaQuery'
import { getSNSERC20Exchange, getSNSERC20 } from 'apollo/mutations/sns'

const { Meta } = Card

export default props => {
  const { rank } = props

  const history = useHistory()
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <CardContainer
        title={
          <>
            <Avatar src="https://joeschmoe.io/api/v1/random" />
            <Title> #认购池ASD</Title>
          </>
        }
        extra={<CardNo className="cardNo">01</CardNo>}
        hoverable
        onClick={() => {
          if (rank !== 100) {
            setModalVisible(true)
          } else {
            message.warning({
              content: '认购池已满'
            })
          }
        }}
      >
        <Meta
          avatar={<Progress type="circle" percent={rank} width={50} />}
          // title="#认购池ASD"
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
        onOk={() => {
          history.push({ pathname: '/SubscriptionPoolDetails' })
          setModalVisible(false)
        }}
        okButtonProps={{
          shape: 'round'
        }}
        onCancel={async () => {
          const ERC20FromTokenAddress = await getSNSERC20Exchange(
            '0xc9c135951Be7b8442068B783E26ebD730d6Ad633'
          )
          console.log('ERC20FromTokenAddress:', ERC20FromTokenAddress)

          const ERC20ExchagePoolMaxId = await getSNSERC20Exchange(
            '0x5f191D8dA9d519738299d340F8f6c06eC44Ab870'
          )

          console.log('')

          try {
            const poolMaxId = await ERC20ExchagePoolMaxId.poolMaxId()
            console.log('poolMaxId:', poolMaxId)
          } catch (error) {
            console.log('poolMaxIdError:', error)
          }

          try {
            const fromAddress = await ERC20FromTokenAddress.fromTokenAddress()
            console.log('fromAddress:', fromAddress)
          } catch (error) {
            console.log('fromAddressError:', error)
          }

          const ERC20 = await getSNSERC20()
          console.log('ERC20:', ERC20)

          // const fromAddress = await ERC20FromTokenAddress.fromTokenAddress();
          // console.log("fromAddress:", fromAddress)
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
