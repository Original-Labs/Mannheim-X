import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled/macro'
import mq from 'mediaQuery'
import HeaderContainer from 'components/Header/Header'
import { Alert, Button, message } from 'antd'
import SubscriptionPoolCard from 'components/SubscriptionPoolCard'
import AlertBanner from 'components/AlertBanner'
import { catchHandle, copyArray, ERC20ExchangeAddress } from 'utils/utils'
import { getSNSERC20Exchange } from 'apollo/mutations/sns'
import store from 'Store/index.js'
import EthVal from 'ethval'

const poolTotalAmount = 100000

export default () => {
  const [poolListState, setPoolListState] = useState(store.getState().poolList)
  const [storeState, setStoreState] = useState(store.getState())
  const { searchList, poolList } = storeState
  const [searchValue, setSearchValue] = useState(store.getState())

  // 监听state的变化
  store.subscribe(() => {
    setSearchValue(store.getState().inputValue)
    console.log('searchValue:', store.getState().inputValue)
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

  console.log('storeState:', storeState)
  console.log('searchList:', searchList)
  console.log('poolList:', poolList)

  const handleSearch = () => {
    const { searchList, poolList } = storeState
    const tempArr = searchList.length === 0 ? poolList : searchList
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

  // 获取池的个数
  const getMaxPoolId = async () => {
    const ERC20Exchange = await getSNSERC20Exchange(ERC20ExchangeAddress)
    try {
      let maxPoolId = await ERC20Exchange.poolMaxId()
      console.log('maxPoolId:', parseInt(maxPoolId._hex, 16))
      return parseInt(maxPoolId._hex, 16)
    } catch (e) {
      console.log(e)
      catchHandle(e)
    }
  }

  // 处理池的数据
  const handleListData = async () => {
    const { poolList } = storeState
    const poolArr = []
    const maxPoolIdVal = await getMaxPoolId()
    poolList.map(async item => {
      if (item.poolId <= maxPoolIdVal) {
        getPoolBalance(item.poolId).then(balance => {
          item.rank = (balance / poolTotalAmount) * 100
          console.log('balance:', balance)
          console.log('rank:', item.rank)
        })
        poolArr.push(item)
      }
    })
    console.log('poolArr:', poolArr)
    const action = {
      type: 'getList',
      value: handleRank(poolArr)
    }
    store.dispatch(action)
  }

  useEffect(() => {
    handleListData()
  }, [searchValue])

  return (
    <Hero>
      <HeaderContainer />
      <ContentContainer>
        <AlertBanner />
        <CardContainer>
          {poolListState.map(item => {
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
