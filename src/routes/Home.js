import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled/macro'
import mq from 'mediaQuery'
import HeaderContainer from 'components/Header/Header'
import { Alert, Button } from 'antd'
import SubscriptionPoolCard from 'components/SubscriptionPoolCard'
import AlertBanner from 'components/AlertBanner'
import { copyArray } from 'utils/utils'

const obj = {
  poolId: '',
  avatar: '',
  title: '',
  description: '',
  banner: ''
}

const poolList = [
  {
    rank: 80
  },
  {
    rank: 100
  },
  {
    rank: 100
  },
  {
    rank: 10
  },
  {
    rank: 54
  },
  {
    rank: 23
  },
  {
    rank: 75
  },
  {
    rank: 87
  },
  {
    rank: 38
  },
  {
    rank: 83
  },
  {
    rank: 80
  },
  {
    rank: 50
  },
  {
    rank: 3
  },
  {
    rank: 6
  },
  {
    rank: 50
  },
  {
    rank: 0
  },
  {
    rank: 100
  },
  {
    rank: 5
  },
  {
    rank: 90
  },
  {
    rank: 99
  }
]
export default () => {
  const [poolListState, setPoolListState] = useState(poolList)

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
    console.log('contactArr:', contactArr)

    setPoolListState(contactArr)
  }

  const handleSearch = () => {
    const filterArr = []
    poolListState.filter(item => {
      if (item.rank === 100) {
        filterArr.push(item)
      }
    })
    console.log('filterArr:', filterArr)
    setPoolListState(filterArr)
  }

  useEffect(() => {
    handleRank()
  }, [])

  return (
    <Hero>
      <HeaderContainer />
      <ContentContainer>
        <AlertBanner handleSearch={handleSearch} />
        {poolListState.map(item => {
          return <SubscriptionPoolCard rank={item.rank} />
        })}
      </ContentContainer>
    </Hero>
  )
}

const ContentContainer = styled('div')`
  display: flex;
  width: 100vw;
  max-width: 1300px;
  flex-wrap: wrap;
  justify-content: center;
`

export const Hero = styled('section')`
  padding: 60px 20px 20px;
  posarr: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  ${mq.medium`
    padding: 100px 20px 20px;
  `}
`
