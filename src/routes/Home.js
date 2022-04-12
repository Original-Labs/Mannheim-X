import React from 'react'
import styled from '@emotion/styled/macro'
import mq from 'mediaQuery'
import HeaderContainer from 'components/Header/Header'
import { Alert } from 'antd'
import SubscriptionPoolCard from 'components/SubscriptionPoolCard'
import AlertBanner from 'components/AlertBanner'

export default () => {
  return (
    <Hero>
      <HeaderContainer />
      <ContentContainer>
        <AlertBanner />
        <SubscriptionPoolCard />
        <SubscriptionPoolCard />
        <SubscriptionPoolCard />
        <SubscriptionPoolCard />
        <SubscriptionPoolCard />
        <SubscriptionPoolCard />
        <SubscriptionPoolCard />
        <SubscriptionPoolCard />
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  ${mq.medium`
    padding: 100px 20px 20px;
  `}
`
