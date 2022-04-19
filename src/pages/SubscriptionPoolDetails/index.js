import React, { useEffect, useState } from 'react'
import mq from 'mediaQuery'
import {
  Card,
  Avatar,
  Progress,
  Alert,
  Input,
  InputNumber,
  Button,
  Modal
} from 'antd'
import './index.css'
import styled from '@emotion/styled'
import AlertBanner from 'components/AlertBanner'
import { getSNSERC20Exchange, getSNSERC20 } from 'apollo/mutations/sns'
import { ERC20ExchangeAddress } from 'utils/utils'
import EthVal from 'ethval'

const coinsAmount = 200

export default props => {
  const [modalVisible, setModalVisible] = useState(false)
  const poolDetails = props.location.state.details

  // 用户输入的认购数量
  const [inputSubscribe, setInputSubscribe] = useState(1)
  // 用户输入的销毁数量
  const [inputBurn, setInputBurn] = useState(1)

  // 已兑换池数量状态值
  const [exchangeAmountState, setExchangeAmountState] = useState('-')
  // 剩余可兑换数量状态值
  const [exchangeableAmountState, setExchangeableAmountState] = useState('-')
  // 用户可兑换数量状态值
  const [usrExchangeAmountState, setUsrExchangeAmountState] = useState('-')
  // 可销毁的数量状态值
  const [burnAmountState, setBurnAmountState] = useState('-')

  // 获取ERC20实例
  const getERC20Instance = async () => {
    const ERC20Exchange = await getSNSERC20Exchange(ERC20ExchangeAddress)
    const fromTokenAdd = await ERC20Exchange.fromTokenAddress()
    const ERC20 = await getSNSERC20(fromTokenAdd)
    return ERC20
  }

  // 获取兑换池已兑换的数量
  const getPoolExchangeAmount = async () => {
    const ERC20Exchange = await getSNSERC20Exchange(ERC20ExchangeAddress)
    try {
      const exchangedAmount = await ERC20Exchange.poolExchangeAmount(
        poolDetails.poolId
      )
      console.log('exchangedAmount:', parseInt(exchangedAmount._hex, 16))
      setExchangeAmountState(parseInt(exchangedAmount._hex, 16))
    } catch (error) {
      console.log('poolExchangeAmountError:', error)
      return '-'
    }
  }

  // 获取兑换池剩余的可兑换数量
  const getPoolBalance = async () => {
    const ERC20Exchange = await getSNSERC20Exchange(ERC20ExchangeAddress)
    try {
      const exchangeableAmount = await ERC20Exchange.poolBalance(
        poolDetails.poolId
      )
      const handleAmount = parseInt(exchangeableAmount._hex, 16)
      const amountVal = new EthVal(`${exchangeableAmount._hex}`)
        .toEth()
        .toFixed(3)
      console.log('amountVal:', amountVal)
      setExchangeableAmountState(amountVal)
    } catch (error) {
      console.log('poolBalanceError:', error)
    }
  }

  // 获取用户可以兑换的余额
  const getUserExchangeAvailable = async () => {
    const ERC20Exchange = await getSNSERC20Exchange(ERC20ExchangeAddress)
    try {
      const usrExchangeAmount = await ERC20Exchange.userExchangeAvailable()
      console.log('usrExchangeAmount:', usrExchangeAmount)
      const ethVal = new EthVal(`${usrExchangeAmount}`).toEth().toFixed(3)
      setUsrExchangeAmountState(ethVal)
    } catch (error) {
      console.log('userExchangeAvailableError:', error)
    }
  }

  // 授权ERC20合约
  const handleApprove = async () => {
    const ERC20 = await getERC20Instance()
    try {
      // const callApprove = await
    } catch (error) {}
  }

  // 用户可销毁的金额
  const getBurnAmount = async () => {
    const ERC20 = await getERC20Instance()
    try {
      const allowanceAmount = await ERC20.balanceOf()
      const ethVal = new EthVal(`${allowanceAmount}`).toEth().toFixed(3)
      setBurnAmountState(ethVal)
    } catch (error) {
      console.log('allowanceError:', error)
    }
  }

  useEffect(() => {
    getPoolExchangeAmount()
    getPoolBalance()
    getUserExchangeAvailable()
    getBurnAmount()
  }, [])

  return (
    <DetailsContainer>
      <AlertBanner />

      <CardDetailsContainer
        title={
          <>
            <Avatar src="https://joeschmoe.io/api/v1/random" />
            <Title> {poolDetails.title}</Title>
          </>
        }
        extra={<Progress type="circle" percent={poolDetails.rank} width={40} />}
      >
        <div>
          已认购数量: {exchangeAmountState} | 剩余:{exchangeableAmountState}
        </div>
        <div>
          认购池专属链接:{' '}
          <a href="https://www.baidu.com" target="_blank">
            百度
          </a>
        </div>

        <PuchaseAndDestroy>
          <InpAndBtnWrapper>
            <PushchaseAndDestroyText>
              可销毁的数量:{burnAmountState}
            </PushchaseAndDestroyText>
            <InpAndBtnCompact>
              <Input.Group compact>
                <Input disabled value={coinsAmount} style={{ width: '50px' }} />
                <InputNumber
                  addonAfter="份"
                  defaultValue={1}
                  style={{ width: '90px' }}
                  min="0"
                  controls={false}
                  precision={0}
                  onChange={value => {
                    setInputBurn(value)
                  }}
                />
              </Input.Group>
              <ButtonWrapper type="primary">销毁</ButtonWrapper>
            </InpAndBtnCompact>
          </InpAndBtnWrapper>

          <InpAndBtnWrapper>
            <PushchaseAndDestroyText>
              可认购的数量:{usrExchangeAmountState}
            </PushchaseAndDestroyText>
            <InpAndBtnCompact>
              <Input.Group compact>
                <Input disabled value={coinsAmount} style={{ width: '50px' }} />
                <InputNumber
                  addonAfter="份"
                  defaultValue={inputSubscribe}
                  style={{ width: '90px' }}
                  min="0"
                  controls={false}
                  precision={0}
                  onChange={value => {
                    setInputSubscribe(value)
                  }}
                />
              </Input.Group>
              <ButtonWrapper
                type="primary"
                onClick={() => {
                  setModalVisible(true)
                }}
              >
                认购
              </ButtonWrapper>
            </InpAndBtnCompact>
          </InpAndBtnWrapper>
        </PuchaseAndDestroy>

        <AlertWrapper
          description="注：认购新币前需销毁旧币，每销毁1枚旧币可获得200枚新币认购资格。"
          type="warning"
        />
      </CardDetailsContainer>
      <Modal
        title="认购详情"
        width={300}
        maskClosable={false}
        style={{ top: '30vh' }}
        visible={modalVisible}
        onOk={() => {
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
        <div>
          认购数量:{coinsAmount} X {inputSubscribe}份 ={' '}
          {coinsAmount * inputSubscribe}
        </div>
        <div>剩余可认购数量: xxx</div>
        <div>
          需支付: 0.3 U X {coinsAmount * inputSubscribe} ={' '}
          {coinsAmount * inputSubscribe * 0.3} U
        </div>
      </Modal>
    </DetailsContainer>
  )
}

const DetailsContainer = styled('div')`
  padding: 20px;
  ${mq.medium`
        min-width:1300px;
    `}
`

const CardDetailsContainer = styled(Card)`
  margin: 10px 0;
  &:hover a {
    color: #da0037;
  }
`

const Title = styled('div')`
  display: inline-block;
  height: 32px;
  margin-left: 10px;
  line-height: 32px;
`

const PuchaseAndDestroy = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  ${mq.medium`
        justify-content:space-around;
        flex-wrap:nowrap;
    `}
`

const InpAndBtnWrapper = styled('div')`
  margin: 20px 0;
`

const PushchaseAndDestroyText = styled('div')`
  margin-bottom: 10px;
`

const InpAndBtnCompact = styled('div')`
  display: flex;
  justify-content: space-around;
`

const ButtonWrapper = styled(Button)`
  margin-left: 20px;
  border-radius: 16px;
  background-color: #212112 !important;
  color: #ffc107 !important;
  &:hover {
    background-color: #212112 !important;
    color: #ffc107 !important;
  }
  &:active {
    color: #fff !important;
  }
`

const AlertWrapper = styled(Alert)`
  border-radius: 16px;
`
