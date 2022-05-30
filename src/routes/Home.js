import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled/macro'
import mq from 'mediaQuery'
import HeaderContainer from 'components/Header/Header'
import { Alert, Button, message, Spin } from 'antd'
import SubscriptionPoolCard from 'pages/SubscriptionPoolCard'
import AlertBanner from 'components/AlertBanner'
import { catchHandle, copyArray, ERC20ExchangeAddress } from 'utils/utils'
import { getSNSERC20Exchange } from 'apollo/mutations/sns'
import { store } from 'Store/index.js'
import EthVal from 'ethval'
import Loading from 'components/Loading/Loading'
import { isReadOnly } from 'contracts'

const poolTotalAmount = 100000

export default () => {
  const [poolListState, setPoolListState] = useState(store.getState().poolList)
  const [storeState, setStoreState] = useState(store.getState())
  const { searchList, poolList } = storeState
  const [searchValue, setSearchValue] = useState(store.getState())

  // 监听state的变化
  store.subscribe(() => {
    setSearchValue(store.getState().inputValue)
    setStoreState(store.getState())
    setPoolListState(poolList)
  })

  // 降序排列,排名满的在最后
  const handleRank = poolArr => {
    // 降序排列
    poolArr.sort((a, b) => {
      return b.rank - a.rank
    })

    // 找到池满的位置
    let posArr = []
    poolArr.map((item, index) => {
      if (item.rank === 100) {
        posArr.push(index)
      }
    })

    const tempArr = copyArray(poolArr)

    // 将满的池子从头部删除,拼接到尾部
    const spliceArr = tempArr.splice(0, posArr.length)
    const contactArr = tempArr.concat(spliceArr)
    return contactArr
  }

  const handleSearch = () => {
    const tempArr = searchList.length === 0 ? poolListState : searchList
    return tempArr
  }

  // 获取每个池的剩余额度
  const getPoolBalance = async poolId => {
    const ERC20Exchange = await getSNSERC20Exchange(ERC20ExchangeAddress)
    try {
      const poolAmount = await ERC20Exchange.poolBalance(poolId)
      const ethVal = new EthVal(`${poolAmount}`).toEth().toFixed(3)
      return ethVal
    } catch (error) {
      console.log('poolBalanceError:', error)
      return 0
    }
  }

  // 获取兑换池已兑换的数量
  const getPoolExchangeAmount = async poolId => {
    const ERC20Exchange = await getSNSERC20Exchange(ERC20ExchangeAddress)
    try {
      const exchangedAmount = await ERC20Exchange.poolExchangeAmount(poolId)
      return new EthVal(`${exchangedAmount._hex}`).toEth().toFixed(0)
    } catch (error) {
      console.log('poolExchangeAmountError:', error)
      return '-'
    }
  }

  // 获取池的个数
  const getMaxPoolId = async () => {
    const ERC20Exchange = await getSNSERC20Exchange(ERC20ExchangeAddress)
    try {
      let maxPoolId = await ERC20Exchange.poolMaxId()
      return parseInt(maxPoolId._hex, 16)
    } catch (e) {
      console.log('poolMaxIdError', e)
      message.error('获取认购池数失败,请尝试刷新页面!')
      catchHandle(e)
    }
  }

  const handleBanner = async () => {
    const ERC20Exchange = await getSNSERC20Exchange(ERC20ExchangeAddress)
    try {
      ERC20Exchange.getBanner().then(resBanner => {
        const action = {
          type: 'setBanner',
          value: resBanner
        }
        store.dispatch(action)
      })
    } catch (error) {
      console.log('bannerError:', error)
    }
  }

  // 处理池的数据
  const handleListData = async () => {
    const { poolList } = storeState
    const maxPoolIdVal = await getMaxPoolId()
    Promise.all(
      poolList.map(async item => {
        if (item.poolId <= maxPoolIdVal) {
          const balance = await getPoolBalance(item.poolId)
          const exchangeaAmount = await getPoolExchangeAmount(item.poolId)
          item.rank = (
            (exchangeaAmount / (balance + exchangeaAmount)) *
            100
          ).toFixed(0)
          item.balance = balance
          item.exchangeaAmount = exchangeaAmount
          return item
        }
        return item
      })
    )
      .then(resList => {
        const action = {
          type: 'getList',
          value: handleRank(resList)
        }
        store.dispatch(action)
      })
      .catch(e => {
        console.log('getPoolBalanceError:', e)
        setSearchValue(null)
      })
  }

  // if (!isReadOnly()) {
  //   console.log('isReady:', isReadOnly())
  //   setSearchValue(null)
  // }

  useEffect(() => {
    // 定时器的目的是等待钱包连接响应完成,合约可调取
    setTimeout(() => {
      // 获取广告条
      handleBanner()
      handleListData()
    }, 3000)
  }, [searchValue])

  return (
    <Hero>
      <HeaderContainer />
      <ContentContainer>
        <AlertBanner />
        <CardContainer>
          {handleSearch().map(item => {
            return <SubscriptionPoolCard poolItem={item} />
          })}
        </CardContainer>
      </ContentContainer>
    </Hero>
  )
}

const ContentContainer = styled('div')``

const CardContainer = styled('div')`
  display: flex;
  max-width: 1300px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 10px;
`

export const Hero = styled('section')`
  padding: 60px 20px 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  ${mq.medium`
    padding: 100px 20px 20px;
  `}
`
