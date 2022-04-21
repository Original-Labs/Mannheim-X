import React, { useEffect, useState } from 'react'
import mq, { useMediaMin } from 'mediaQuery'
import { Card, Avatar, Row, Col } from 'antd'
import './index.css'
import styled from '@emotion/styled'
import axios from 'axios'
import { getAccount, getNetworkId } from '../../contracts'
import messageMention from '../../utils/messageMention'
import {
  bscScanApiKey,
  BUSDT,
  ERC20ExchangeAddress,
  newCoin,
  oldCoin,
  payRatio
} from '../../utils/utils'
import { useTranslation } from 'react-i18next'
import store from '../../Store'
import { getSNSERC20Exchange } from '../../apollo/mutations/sns'

const { Meta } = Card

export default ({ match }) => {
  const mediumBP = useMediaMin('medium')

  const [subscribeList, setSubscribeList] = useState(
    store.getState().subscribeList
  )
  const [subscribeSummary, setSubscribeSummary] = useState({
    totalPayAmount: '-',
    totalBurnAmount: '-',
    totalSubscribeAmount: '-'
  })

  let { t } = useTranslation()

  let networkId = null

  const handleSubscribeData = async data => {
    let totalPayAmount = 0
    let totalSubscribeAmount = 0
    let totalBurnAmount = 0

    const networkId = await getNetworkId()
    const exchangeInstance = await getSNSERC20Exchange(ERC20ExchangeAddress)
    let exchangeRatioOrigin = await exchangeInstance.exchangeRatio()
    let feeRatioOrigin = await exchangeInstance.feeRatio()
    let ratioDecimalOrigin = await exchangeInstance.ratioDecimal()
    let feeRatio = parseInt(feeRatioOrigin._hex, 16)
    let ratioDecimal = parseInt(ratioDecimalOrigin._hex, 16)
    let exchangeRatio = parseInt(exchangeRatioOrigin._hex, 16)

    // 数据处理
    // 1 url处理
    for (let i = 0; i < data.length; i++) {
      let subscribeAmount = getSubscribeAmount(data[i].input)
      data[i].url =
        networkId == 97
          ? 'https://testnet.bscscan.com/tx/' + data[i].hash
          : 'https://bscscan.com/tx/' + data[i].hash
      totalSubscribeAmount += subscribeAmount
      data[i].subscribeAmount = subscribeAmount
      data[i].dateTime = getDateTime(data[i].timeStamp)
      data[i].payAmount = (subscribeAmount * feeRatio) / ratioDecimal
    }
    totalPayAmount = (totalSubscribeAmount * feeRatio) / ratioDecimal
    totalBurnAmount = (totalSubscribeAmount * ratioDecimal) / exchangeRatio
    setSubscribeList(data)
    let totalData = {}
    totalData.totalSubscribeAmount = totalSubscribeAmount
    totalData.totalPayAmount = totalPayAmount
    totalData.totalBurnAmount = totalBurnAmount
    console.log('totalData', totalData)
    setSubscribeSummary(totalData)
  }

  const handleReq = url => {
    axios
      .get(url)
      .then(resp => {
        if (resp && resp.data && resp.data.status === '1') {
          let txData = resp.data.result
          let exchangeContractTxData = []
          for (let i = 0; i < txData.length; i++) {
            if (txData[i].to === ERC20ExchangeAddress.toLocaleLowerCase()) {
              exchangeContractTxData.push(txData[i])
            }
          }
          console.log('exchangeContractTxData', exchangeContractTxData)
          // 已经存在旧数据，判定新旧数据是否一致，一致则不进行setSubscribeList
          if (
            subscribeList.length > 0 ||
            subscribeList.length == exchangeContractTxData.length
          ) {
            for (let i = 0; i < subscribeList.length; i++) {
              if (
                subscribeList[i].blockNumber !=
                exchangeContractTxData[i].blockNumber
              ) {
                handleSubscribeData(exchangeContractTxData)
              }
            }
          } else {
            handleSubscribeData(exchangeContractTxData)
          }
        } else if (resp && resp.data && resp.data.code === 500) {
          messageMention({
            type: 'error',
            content: `${t('serviceMsg.servErr')}`
          })
        } else if (resp && resp.data && resp.data.code === 10001) {
          messageMention({
            type: 'warn',
            content: `${t('serviceMsg.paramsIsNull')}`
          })
        } else {
          messageMention({
            type: 'error',
            content: `${t('serviceMsg.unkonwErr')}`
          })
        }
      })
      .catch(e => {
        console.log(e)
        messageMention({
          type: 'error',
          content: `${t('serviceMsg.unkonwErr')}`
        })
      })
  }

  const getSubscribeRecords = async () => {
    networkId = await getNetworkId()
    let address = await getAccount()
    const startblock = 0
    const endblock = 99999999
    const testnetBaseUrl = `https://api-testnet.bscscan.com/api?module=account&action=txlist`
    const mainnetBaseUrl = `https://api.bscscan.com/api?module=account&action=txlist`
    let urlParams = `&address=${address.toString()}&startblock=${startblock}&endblock=${endblock}&page=1&offset=100&sort=asc&apikey=${bscScanApiKey}`
    switch (networkId) {
      case 97:
      case '97':
        handleReq(testnetBaseUrl + urlParams)
        break
      case 56:
      case '56':
        handleReq(mainnetBaseUrl + urlParams)
        break
      default:
        break
    }
  }

  const getSubscribeAmount = item => {
    let inputStr = item.substring(10)
    let number = parseInt(inputStr, 16)
    let numberStr = number.toString(10)
    return numberStr / 10 ** 18
  }
  const getDateTime = item => {
    return new Date(item * 1000).toUTCString().substring(5)
  }

  useEffect(() => {
    getSubscribeRecords()
    setTimeout(() => {
      getSubscribeRecords()
    }, 3000)
  }, [])

  return (
    <div className="MyRecordContainer">
      <Card title="认购汇总" className="CardTotalContainer">
        <div>
          认购总数: {subscribeSummary.totalSubscribeAmount} {newCoin}
        </div>
        <div>
          销毁总数: {subscribeSummary.totalBurnAmount} {oldCoin}
        </div>
        <div>
          支付总金额: {subscribeSummary.totalPayAmount} {BUSDT}
        </div>
      </Card>
      {subscribeList.map(item => {
        return (
          <Card
            title={
              <>
                <Avatar src="https://joeschmoe.io/api/v1/random" />
                <Title>认购池名称</Title>
              </>
            }
            className="transRecord"
            size="small"
          >
            <Row gutter={24}>
              <Col span={24}>
                认购数: {item.subscribeAmount} {newCoin}
              </Col>
              <Col span={24}>
                支付金额: {item.payAmount} {BUSDT}
              </Col>
              <Col span={24}>交易时间: {item.dateTime}</Col>
              <Col span={24}>
                <div style={{ overflow: 'hidden' }}>交易哈希:{item.hash}</div>
              </Col>
              <Col span={24}>
                <a href={item.url}>交易链接</a>
              </Col>
            </Row>
          </Card>
        )
      })}
    </div>
  )
}

const Title = styled('div')`
  display: inline-block;
  height: 32px;
  margin-left: 10px;
  line-height: 32px;
`
const nowrap = styled('div')`
  /*不允许换行*/
  white-space: nowrap;
  /*超出的部分隐藏*/
  overflow: hidden;
  /*多余的文字变成 “...”*/
  text-overflow: ellipsis;
`
