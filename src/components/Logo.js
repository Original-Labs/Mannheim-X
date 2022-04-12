import React from 'react'
import styled from '@emotion/styled/macro'
import { Link } from 'react-router-dom'
import mq from 'mediaQuery'

// import ENSLogo from '../assets/ensIconLogo.svg'
import ENSLogo from '../assets/logo_single.svg'
import LogoTyped from '../assets/TypeLogo'

const IconLogo = styled('img')`
  width: 60px;
  ${mq.medium`
    width: 100px
  `}
`

const LogoContainer = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-left: 0px;
  align-items: center;
  width: 100px;
  background-color: transparent;

  ${mq.medium`
    width: 100px;
  `}
`

const Logo = ({ color, className, to = '' }) => (
  <LogoContainer className={className} to={to}>
    <IconLogo src={ENSLogo} />
  </LogoContainer>
)

export default Logo
