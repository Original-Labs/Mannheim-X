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
  Modal,
  message
} from 'antd'
import './index.css'
import styled from '@emotion/styled'
import AlertBanner from 'components/AlertBanner'
import { getSNSERC20Exchange, getSNSERC20 } from 'apollo/mutations/sns'
import {
  ERC20ExchangeAddress,
  etherUnit,
  etherUnitHandle,
  etherUnitStr,
  exchangeRate
} from 'utils/utils'
import EthVal from 'ethval'
import { UnknowErrMsgComponent } from '../../components/UnknowErrMsg'
import { getEnsStartBlock } from '../../utils'
import { getAccount, getBlock, getERC20ExchangeContract } from '../../contracts'
import { BigNumber } from '@0xproject/utils'
import { Trans, useTranslation } from 'react-i18next'
import messageMention from '../../utils/messageMention'
import { useHistory } from 'react-router'

const coinsAmount = 200

export default props => {
  const [modalVisible, setModalVisible] = useState(false)
  const poolDetails = props.location.state.details
  console.log('props:', props)

  let { t } = useTranslation()

  const history = useHistory()

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

  const [exchangeRatio, setExchangeRatio] = useState('-')
  const [feeRatio, setFeeRatio] = useState('-')
  const [ratioDecimal, setRatioDecimal] = useState('-')
  const [feeShare, setFeeShare] = useState('-')

  // const [poolDetails, setPoolDetails] = useState({})

  // 获取该用户的认购池详情
  // const getPoolItemDetails = async () => {
  //   const ERC20Exchange = await getSNSERC20Exchange(ERC20ExchangeAddress)
  //   const usrPoolId = await ERC20Exchange.getUserPool()
  //   console.log('usrPoolId:', parseInt(usrPoolId, 16))
  //   const { poolList } = store.getState()
  //   poolList.map(item => {
  //     if (item.poolId === parseInt(usrPoolId, 16)) {
  //       setPoolDetails(item)
  //     }
  //   })
  // }

  // 获取FromToken实例
  const getFromTokenInstance = async () => {
    const ERC20Exchange = await getSNSERC20Exchange(ERC20ExchangeAddress)
    const fromTokenAdd = await ERC20Exchange.fromTokenAddress()
    const ERC20 = await getSNSERC20(fromTokenAdd)
    return ERC20
  }

  // 获取FeeToken实例
  const getFeeTokenInstance = async () => {
    const ERC20Exchange = await getSNSERC20Exchange(ERC20ExchangeAddress)
    const feeTokenAdd = await ERC20Exchange.feeTokenAddress()
    const ERC20 = await getSNSERC20(feeTokenAdd)
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
      // setExchangeAmountState(parseInt(exchangedAmount._hex, 16))
      setExchangeAmountState(
        new EthVal(`${exchangedAmount._hex}`).toEth().toFixed(3)
      )
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
    const ERC20 = await getFromTokenInstance()
    const exchangeInstance = await getSNSERC20Exchange(ERC20ExchangeAddress)
    try {
      const allowanceAmount = await ERC20.allowance(ERC20ExchangeAddress)
      const ethVal = new EthVal(`${allowanceAmount}`).toEth().toFixed(3)
      if (ethVal > 0) {
        console.log('ethVal', parseInt(ethVal, 10))
        const exchangeRatioHex = await exchangeInstance.exchangeRatio()
        const ratioDecimalHex = await exchangeInstance.ratioDecimal()
        const exchangeRatio = parseInt(exchangeRatioHex._hex, 16)
        const ratioDecimal = parseInt(ratioDecimalHex._hex, 16)
        setUsrExchangeAmountState((ethVal * exchangeRatio) / ratioDecimal)
      }
    } catch (error) {
      console.log('userExchangeAvailableError:', error)
    }
  }

  // 授权ERC20合约
  const handleBurnApprove = async () => {
    const ERC20 = await getFromTokenInstance()
    try {
      let burnAmount = coinsAmount * inputBurn
      if (burnAmount > burnAmountState) {
        // 弹窗提示
        message.warning({
          key: 2,
          content: '可销毁数量不足，请减少销毁值',
          duration: 3,
          style: { marginTop: '20vh' }
        })
        return
      }
      await ERC20.approve(
        ERC20ExchangeAddress,
        etherUnitHandle(coinsAmount * inputBurn)
      )
    } catch (error) {
      console.log(error)
      catchHandle(error)
    }
  }

  const catchHandle = e => {
    if (e && e.data && e.data.code && e.data.message) {
      let errorMessages = e.data.message.split('-')
      let errorContent
      if (errorMessages.length == 2) {
        // get errorCode
        let errCode = errorMessages[1].split(':')[0].trim()
        console.log('[errorCode]', errCode)
        errorContent = <Trans i18nKey={`errorCode.${errCode}`} />
      } else if (
        errorMessages.length == 1 &&
        errorMessages[0].startsWith(
          'err: insufficient funds for gas * price + value:'
        )
      ) {
        errorContent = 'Your wallet does not have enough asset!'
      } else {
        errorContent = e.data.message
      }
      // handle metamask wallet response error code
      console.log('e:', e.code)
      switch (e.code) {
        case 4001:
          errorContent = (
            <Trans i18nKey={`withdrawErrCode.${e.code.toString()}`} />
          )
          break
        case -32603:
          errorContent = <Trans i18nKey={`withdrawErrCode.001`} />
          break
        default:
          errorContent = <UnknowErrMsgComponent />
      }
      message.error({
        key: 1,
        content: errorContent,
        duration: 3,
        style: { marginTop: '20vh' }
      })
    }
  }

  // 授权认购
  const handleSubscriptionApproval = async () => {
    const feeTokenInstance = await getFeeTokenInstance()
    const erc20Exchange = await getSNSERC20Exchange(ERC20ExchangeAddress)

    let subscribeAmount = coinsAmount * inputSubscribe

    if (!usrExchangeAmountState || subscribeAmount > usrExchangeAmountState) {
      // 弹窗提示
      message.warning({
        key: 2,
        content: '认购数量大于可认购值，请降低认购数量',
        duration: 3,
        style: { marginTop: '20vh' }
      })
      return
    }
    console.log('[subscribeAmount]', subscribeAmount)
    // 授权USDT支付，支付金额为 授权认购新币数量的 30%
    try {
      const feeRatioHex = await erc20Exchange.feeRatio()
      const ratioDecimalHex = await erc20Exchange.ratioDecimal()
      const feeRatio = parseInt(feeRatioHex._hex, 16)
      const ratioDecimal = parseInt(ratioDecimalHex._hex, 16)
      await feeTokenInstance.approve(
        ERC20ExchangeAddress,
        etherUnitHandle((subscribeAmount * feeRatio) / ratioDecimal)
      )
      setModalVisible(true)
    } catch (e) {
      catchHandle(e)
    }
  }

  const handleSubscription = async () => {
    const feeTokenInstance = await getFeeTokenInstance()
    try {
      const allowanceAmount = await feeTokenInstance.allowance(
        ERC20ExchangeAddress
      )
      const ethVal = new EthVal(`${allowanceAmount}`).toEth().toFixed(3)
      if (ethVal > 0) {
        await handleExchange()
        setModalVisible(false)
      } else {
        // 弹窗提示
        message.warning({
          key: 1,
          content: '认购授权还未确认，请稍等一会',
          duration: 3,
          style: { marginTop: '20vh' }
        })
      }
    } catch (e) {
      console.log(e)
      catchHandle(e)
    }
  }

  const handleExchange = async () => {
    const erc20Exchange = await getSNSERC20Exchange(ERC20ExchangeAddress)
    try {
      const exchangeTx = await erc20Exchange.exchange(
        etherUnitHandle(coinsAmount * inputSubscribe)
      )
      console.log('[exchangeTx]', exchangeTx)
      if (exchangeTx && exchangeTx.hash) {
        message.loading({
          key: 1,
          content: `${t('z.transferSending')}`,
          duration: 3,
          style: { marginTop: '20vh' }
        })
      }
      setTimeout(() => history.push('/myRecord'), 3000)
    } catch (e) {
      catchHandle(e)
    }
  }

  const getExchangePublicProperty = async () => {
    const exchangeInstance = await getSNSERC20Exchange(ERC20ExchangeAddress)
    try {
      const exchangeRatioOrigin = await exchangeInstance.exchangeRatio()
      let feeRatioOrigin = await exchangeInstance.feeRatio()
      let ratioDecimalOrigin = await exchangeInstance.ratioDecimal()
      let feeShareOrigin = await exchangeInstance.feeShare()
      setExchangeRatio(parseInt(exchangeRatioOrigin._hex, 16))
      setFeeRatio(parseInt(feeRatioOrigin._hex, 16))
      setRatioDecimal(parseInt(ratioDecimalOrigin._hex, 16))
      setFeeShare(parseInt(feeShareOrigin._hex, 16))
      const poolMaxId = await exchangeInstance.poolMaxId()
      console.log('[poolMaxId]', poolMaxId)
    } catch (e) {
      console.log(e)
    }
  }

  // 用户可销毁的金额
  const getBurnAmount = async () => {
    const ERC20 = await getFromTokenInstance()
    try {
      const allowanceAmount = await ERC20.balanceOf()
      const ethVal = new EthVal(`${allowanceAmount}`).toEth().toFixed(3)
      setBurnAmountState(ethVal)
    } catch (error) {
      console.log('allowanceError:', error)
      catchHandle(error)
    }
  }

  useEffect(() => {
    // getPoolItemDetails()
    getExchangePublicProperty()
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
              <ButtonWrapper
                type="primary"
                onClick={() => {
                  handleBurnApprove()
                }}
              >
                销毁
              </ButtonWrapper>
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
                  handleSubscriptionApproval()
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
          handleSubscription()
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
        <div>剩余可认购数量: {exchangeableAmountState}</div>
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
