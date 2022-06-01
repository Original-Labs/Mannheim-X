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
  message,
  Typography,
  Select
} from 'antd'
import './index.css'
import styled from '@emotion/styled'
import AlertBanner from 'components/AlertBanner'
import { getSNSERC20Exchange, getSNSERC20 } from 'apollo/mutations/sns'
import { catchHandle, ERC20ExchangeAddress, etherUnitHandle } from 'utils/utils'
import EthVal from 'ethval'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import { store } from 'Store/index.js'
import Loading from 'components/Loading/Loading'

const { Option } = Select
const { Paragraph } = Typography
const coinsAmount = 200
const heimRatio = 0.12

export default props => {
  const [modalVisible, setModalVisible] = useState(false)
  const [obtainSubsVisible, setObtainSubsVisible] = useState(false)
  const [poolItemId, setPoolItemId] = useState(
    Number(props.match.params.poolId) + 21
  )
  const [pageLoading, setPageLoading] = useState(true)

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
  const [bindInput, setBindInput] = useState('')

  const [exchangeRatio, setExchangeRatio] = useState('-')
  const [feeRatio, setFeeRatio] = useState('-')
  const [ratioDecimal, setRatioDecimal] = useState('-')
  const [feeShare, setFeeShare] = useState('-')

  const [poolDetails, setPoolDetails] = useState({})

  const getPoolInfo = () => {
    const { poolList } = store.getState()
    poolList.map(item => {
      if (item.poolId === poolItemId) {
        setPoolDetails(item)
      }
    })
  }

  // 获取该用户的认购池详情
  const getPoolItemDetails = async () => {
    const ERC20Exchange = await getSNSERC20Exchange(ERC20ExchangeAddress)
    try {
      const usrPoolId = await ERC20Exchange.getUserPool()
      const usrPoolIdVal = parseInt(usrPoolId, 16)
      if (poolItemId) {
        if (usrPoolIdVal !== 0 && poolItemId !== usrPoolIdVal) {
          history.push('/')
          message.warning({ content: '已绑定其他认购池,无法进入该池' })
        }
        if (usrPoolIdVal === 0) {
          setObtainSubsVisible(true)
        }
      } else {
        history.push('/')
        message.warning({ content: '未绑定认购池!' })
      }
    } catch (error) {
      console.log('getUserPoolError:', error)
      history.push('/')
      message.error({ content: '获取用户池信息失败!' })
    }
  }

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
      const exchangedAmount = await ERC20Exchange.poolExchangeAmount(poolItemId)
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
      const exchangeableAmount = await ERC20Exchange.poolBalance(poolItemId)
      const amountVal = new EthVal(`${exchangeableAmount._hex}`)
        .scaleUp(6)
        .toFixed(4)
      setExchangeableAmountState(amountVal)
    } catch (error) {
      console.log('poolBalanceError:', error)
    }
  }

  // 获取用户可以兑换的余额
  const getUserExchangeAvailable = async () => {
    const ERC20 = await getFromTokenInstance()
    const exchangeInstance = await getSNSERC20Exchange(ERC20ExchangeAddress)

    const ratioDecimalHex = await exchangeInstance.ratioDecimal()
    const ratioDecimal = parseInt(ratioDecimalHex._hex, 16)

    try {
      const allowanceAmount = await ERC20.allowance(ERC20ExchangeAddress)
      const ethVal = new EthVal(`${allowanceAmount}`).scaleUp(6).toFixed(4)
      if (ethVal > 0) {
        const exchangeRatioHex = await exchangeInstance.exchangeRatio()
        const exchangeRatio = parseInt(exchangeRatioHex._hex, 16)
        setUsrExchangeAmountState((ethVal * exchangeRatio) / ratioDecimal)
      } else {
        setUsrExchangeAmountState(0)
      }
    } catch (error) {
      console.log('userExchangeAvailableError:', error)
    }
  }

  // 授权ERC20合约
  const handleBurnApprove = async () => {
    const ERC20 = await getFromTokenInstance()
    try {
      let burnAmount = inputBurn
      if (burnAmount > burnAmountState) {
        // 弹窗提示
        message.warning({
          key: 2,
          content: '可授权数量不足，请减少授权值',
          duration: 3,
          style: { marginTop: '20vh' }
        })
        return
      }
      ERC20.approve(ERC20ExchangeAddress, etherUnitHandle(inputBurn)).then(
        () => {
          message.info('销毁授权交易中,请等待!')
        }
      )
    } catch (error) {
      console.log(error)
      catchHandle(error)
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
      let exchangeRatioOrigin = await exchangeInstance.exchangeRatio()
      let feeRatioOrigin = await exchangeInstance.feeRatio()
      let ratioDecimalOrigin = await exchangeInstance.ratioDecimal()
      // let feeShareOrigin = await exchangeInstance.feeShare()
      setExchangeRatio(parseInt(exchangeRatioOrigin._hex, 16))
      setFeeRatio(parseInt(feeRatioOrigin._hex, 16))
      setRatioDecimal(parseInt(ratioDecimalOrigin._hex, 16))
      // setFeeShare(parseInt(feeShareOrigin._hex, 16))
      const poolMaxId = await exchangeInstance.poolMaxId()
    } catch (e) {
      console.log(e)
    }
  }

  // 用户可销毁的金额
  const getBurnAmount = async () => {
    const ERC20 = await getFromTokenInstance()
    try {
      const allowanceAmount = await ERC20.balanceOf()
      const ethVal = new EthVal(`${allowanceAmount}`).scaleUp(6).toFixed(3)
      setBurnAmountState(ethVal)
    } catch (error) {
      console.log('allowanceError:', error)
      catchHandle(error)
    }
  }

  const subscribeBind = async (ERC20Exchange, newAdd) => {
    try {
      const isBind = await ERC20Exchange.subscribe(poolItemId, newAdd)
      if (isBind) {
        message.success({ content: '绑定成功!' })
      }
      history.push({
        pathname: `/SubscriptionPoolDetails/${poolDetails.poolId}`
      })
    } catch (error) {
      history.push('/')
      console.log('subscribeError:', error)
      catchHandle(error)
    }
  }

  const batchCallFn = async () => {
    await getPoolInfo()
    await getExchangePublicProperty()
    await getPoolExchangeAmount()
    await getPoolBalance()
    await getUserExchangeAvailable()
    await getBurnAmount()
  }

  useEffect(() => {
    let timer
    setPoolItemId(Number(props.match.params.poolId) + 21)
    setTimeout(() => {
      getPoolItemDetails()
      batchCallFn()
      timer = setInterval(() => {
        batchCallFn()
      }, 3000)
      setPageLoading(false)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Loading loading={pageLoading} size="large" defaultColor="#ffc107">
      <DetailsContainer>
        <AlertBanner />

        <CardDetailsContainer
          title={
            <>
              <Avatar src="https://joeschmoe.io/api/v1/random" />
              <Title> {poolDetails.title}</Title>
            </>
          }
          extra={
            <Progress type="circle" percent={poolDetails.rank} width={40} />
          }
          style={{ backgroundColor: poolDetails.backColor }}
        >
          <CardDetailsInfo>
            <CardDetailsStep>第一步：支付DMI获得白名单权限</CardDetailsStep>
            <div>支付DMI激活您的白名单资格授权激活</div>
            <CardDetailsStep>
              第二步：支付BUSD进行申购HEIM(每个钱包至多2份)
            </CardDetailsStep>
            <div>
              已认购数量: {exchangeAmountState} | 剩余:{exchangeableAmountState}{' '}
              HEIM
            </div>
            <div>
              <Paragraph copyable={{ text: window.location.href }}>
                认购池专属链接
              </Paragraph>
            </div>
          </CardDetailsInfo>

          <PuchaseAndDestroy>
            <InpAndBtnWrapper>
              <PushchaseAndDestroyText>
                可授权的DMI数量:{burnAmountState}
              </PushchaseAndDestroyText>
              <InpAndBtnCompact>
                <Input.Group compact>
                  <Input disabled value="1" style={{ width: '50px' }} />
                  <Select
                    defaultValue={1}
                    onSelect={value => {
                      setInputBurn(value)
                    }}
                  >
                    <Option value={1}>1 份</Option>
                    <Option value={2}>2 份</Option>
                  </Select>
                </Input.Group>
                <ButtonWrapper
                  type="primary"
                  shape="round"
                  onClick={() => {
                    handleBurnApprove()
                  }}
                >
                  激活
                </ButtonWrapper>
              </InpAndBtnCompact>
            </InpAndBtnWrapper>

            <InpAndBtnWrapper>
              <PushchaseAndDestroyText>
                可认购的HEIM数量:{usrExchangeAmountState}
              </PushchaseAndDestroyText>
              <InpAndBtnCompact>
                <Input.Group compact>
                  <Input
                    disabled
                    value={coinsAmount}
                    style={{ width: '50px' }}
                  />
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
                  shape="round"
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
            description={
              <>
                <div>
                  注：用户可以进行申请100USDT或200USDT
                  两种不同份额的白名单额度，对应需要支付1枚和2枚DMI
                </div>
                <div>白名单可申购种类：</div>
                <div>A：100 USDT——需要1枚DMI进行授权激活</div>
                <div>B：200 USDT——需要2枚DMI进行授权激活</div>
                <div>
                  *抢购成功的社区用户将会获得 Mannheim
                  亚太矿工联盟的一部分HEIM白名单挖矿分红作为额外奖励。
                </div>
              </>
            }
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
          <div>认购池剩余可认购数量: {exchangeableAmountState}</div>
          <div>
            需支付: {heimRatio} U X {coinsAmount * inputSubscribe} ={' '}
            {coinsAmount * inputSubscribe * heimRatio} BUSD
          </div>
        </Modal>

        <Modal
          title="获得认购资格"
          width={300}
          maskClosable={false}
          style={{ top: '30vh' }}
          visible={obtainSubsVisible}
          onOk={async () => {
            if (bindInput.length === 0) {
              message.error('新币收款地址为必填项!')
            } else {
              const ERC20Exchange = await getSNSERC20Exchange(
                ERC20ExchangeAddress
              )
              await subscribeBind(ERC20Exchange, bindInput)

              setObtainSubsVisible(false)
            }
          }}
          okButtonProps={{
            shape: 'round'
          }}
          onCancel={() => {
            setObtainSubsVisible(false)
            history.push('/')
          }}
          cancelButtonProps={{
            shape: 'round'
          }}
        >
          绑定mannheim地址,请打开
          <a href="https://www.tokenspace.org">tokenspace.org</a>
          钱包创建mannheim地址, 该地址将在申购后默认成为获得HEIM代币的收款地址
          <BindInput>
            <span>绑定mannheim链地址:</span>
            <Input
              onChange={e => {
                setBindInput(e.target.value)
              }}
            />
          </BindInput>
        </Modal>
      </DetailsContainer>
    </Loading>
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

const BindInput = styled('div')`
  margin-top: 10px;
  span {
    color: #ffc107 !important;
  }
`
const CardDetailsInfo = styled('div')`
  display: flex;
  flex-flow: column;
  gap: 10px;
  font-weight: 500;
`

const CardDetailsStep = styled('div')`
  // font-size:16px;
  font-weight: 700;
`
