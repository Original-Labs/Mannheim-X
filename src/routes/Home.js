import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled/macro'
import mq from 'mediaQuery'
import HeaderContainer from 'components/Header/Header'
import { Alert, Button } from 'antd'
import SubscriptionPoolCard from 'components/SubscriptionPoolCard'
import AlertBanner from 'components/AlertBanner'
import { copyArray } from 'utils/utils'
import { getSNSERC20Exchange } from 'apollo/mutations/sns'
import store from 'Store/index.js'

const poolList = [
  {
    poolId: 1,
    avatar: 'https://joeschmoe.io/api/v1/jess',
    title: '1个认购池的标题',
    description: '1个认购池的描述',
    banner: '这是页面的广告栏,横向移动,循环播放',
    rank: 99
  },
  {
    poolId: 2,
    avatar: 'https://joeschmoe.io/api/v1/joe',
    title: '2个认购池的标题',
    description: '2个认购池的描述',
    banner: '这是页面的广告栏,横向移动,循环播放',
    rank: 20
  },
  {
    poolId: 3,
    avatar: 'https://joeschmoe.io/api/v1/josh',
    title: '3个认购池的标题',
    description: '3个认购池的描述',
    banner: '这是页面的广告栏,横向移动,循环播放',
    rank: 34
  },
  {
    poolId: 4,
    avatar: 'https://joeschmoe.io/api/v1/jake',
    title: '4个认购池的标题',
    description: '4个认购池的描述',
    banner: '这是页面的广告栏,横向移动,循环播放',
    rank: 58
  },
  {
    poolId: 5,
    avatar: 'https://joeschmoe.io/api/v1/jeane',
    title: '5个认购池的标题',
    description: '5个认购池的描述',
    banner: '这是页面的广告栏,横向移动,循环播放',
    rank: 5
  },
  {
    poolId: 6,
    avatar: 'https://joeschmoe.io/api/v1/jodi',
    title: '6个认购池的标题',
    description: '6个认购池的描述',
    banner: '这是页面的广告栏,横向移动,循环播放',
    rank: 6
  },
  {
    poolId: 7,
    avatar: 'https://joeschmoe.io/api/v1/jai',
    title: '7个认购池的标题',
    description: '7个认购池的描述',
    banner: '这是页面的广告栏,横向移动,循环播放',
    rank: 7
  },
  {
    poolId: 8,
    avatar: 'https://joeschmoe.io/api/v1/jordan',
    title: '8个认购池的标题',
    description: '8个认购池的描述',
    banner: '这是页面的广告栏,横向移动,循环播放',
    rank: 100
  },
  {
    poolId: 9,
    avatar: 'https://joeschmoe.io/api/v1/jeri',
    title: '9个认购池的标题',
    description: '9个认购池的描述',
    banner: '这是页面的广告栏,横向移动,循环播放',
    rank: 90
  },
  {
    poolId: 10,
    avatar: 'https://joeschmoe.io/api/v1/jazebelle',
    title: '10个认购池的标题',
    description: '10个认购池的描述',
    banner: '这是页面的广告栏,横向移动,循环播放',
    rank: 100
  },
  {
    poolId: 11,
    avatar: 'https://joeschmoe.io/api/v1/jacques',
    title: '11个认购池的标题',
    description: '11个认购池的描述',
    banner: '这是页面的广告栏,横向移动,循环播放',
    rank: 11
  },
  {
    poolId: 12,
    avatar: 'https://joeschmoe.io/api/v1/jana',
    title: '12个认购池的标题',
    description: '12个认购池的描述',
    banner: '这是页面的广告栏,横向移动,循环播放',
    rank: 21
  },
  {
    poolId: 13,
    avatar: 'https://joeschmoe.io/api/v1/julie',
    title: '13个认购池的标题',
    description: '13个认购池的描述',
    banner: '这是页面的广告栏,横向移动,循环播放',
    rank: 31
  },
  {
    poolId: 14,
    avatar: 'https://joeschmoe.io/api/v1/jerry',
    title: '14个认购池的标题',
    description: '14个认购池的描述',
    banner: '这是页面的广告栏,横向移动,循环播放',
    rank: 14
  },
  {
    poolId: 15,
    avatar: 'https://joeschmoe.io/api/v1/jocelyn',
    title: '15个认购池的标题',
    description: '15个认购池的描述',
    banner: '这是页面的广告栏,横向移动,循环播放',
    rank: 50
  },
  {
    poolId: 16,
    avatar: 'https://joeschmoe.io/api/v1/josephine',
    title: '16个认购池的标题',
    description: '16个认购池的描述',
    banner: '这是页面的广告栏,横向移动,循环播放',
    rank: 60
  },
  {
    poolId: 17,
    avatar: 'https://joeschmoe.io/api/v1/jack',
    title: '17个认购池的标题',
    description: '17个认购池的描述',
    banner: '这是页面的广告栏,横向移动,循环播放',
    rank: 71
  },
  {
    poolId: 18,
    avatar: 'https://joeschmoe.io/api/v1/jane',
    title: '18个认购池的标题',
    description: '18个认购池的描述',
    banner: '这是页面的广告栏,横向移动,循环播放',
    rank: 81
  },
  {
    poolId: 19,
    avatar: 'https://joeschmoe.io/api/v1/jed',
    title: '19个认购池的标题',
    description: '19个认购池的描述',
    banner: '这是页面的广告栏,横向移动,循环播放',
    rank: 90
  },
  {
    poolId: 20,
    avatar: 'https://joeschmoe.io/api/v1/james',
    title: '20个认购池的标题',
    description: '20个认购池的描述',
    banner: '这是页面的广告栏,横向移动,循环播放',
    rank: 20
  }
]

export default () => {
  const [poolListState, setPoolListState] = useState(store.getState().poolList)
  const [searchValue, setSearchValue] = useState(store.getState())

  // The subscription pool is sorted from highest to lowest, with the full pool at the bottom
  const handleRank = () => {
    poolList.sort((a, b) => {
      return b.rank - a.rank
    })

    // find positon
    let posArr = []
    poolList.map((item, index) => {
      if (item.rank === 100) {
        posArr.push(index)
      }
    })

    const tempArr = copyArray(poolList)

    // delete 100 percent pool
    const spliceArr = tempArr.splice(0, posArr.length)
    // contact deleted 100 percent pool
    const contactArr = tempArr.concat(spliceArr)

    setPoolListState(contactArr)
  }

  const handleSearch = () => {
    const { searchList } = store.getState()
    return searchList.length === 0 ? poolListState : searchList
  }

  useEffect(() => {
    // 监听state的变化
    store.subscribe(() => {
      setSearchValue(store.getState().inputValue)
    })
    handleRank()
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
