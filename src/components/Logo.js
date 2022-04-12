import React from 'react'
import styled from '@emotion/styled/macro'
import { Link } from 'react-router-dom'
import mq, { useMediaMin, useMediaMax } from 'mediaQuery'
import BigLogo from '../assets/logo_single.png'
import SmallLogo from '../assets/logo.png'

const IconLogo = styled('img')`
  width: 50px;
  ${mq.medium`
    width: 200px;
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

const Logo = ({ color, className, to = '' }) => {
  const mediumBP = useMediaMin('medium')

  return (
    <LogoContainer className={className} to={to}>
      {mediumBP ? <IconLogo src={BigLogo} /> : <IconLogo src={SmallLogo} />}
    </LogoContainer>
  )
}

export default Logo
