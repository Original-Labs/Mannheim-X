import React, { useState } from 'react'
import styled from '@emotion/styled/macro'

import mq, { useMediaMin, useMediaMax } from 'mediaQuery'

import DefaultLogo from '../Logo'
import Search from '../SearchName/Search'
import AvatarAndInfoDropdown from '../AvatarAndInfoDropdown'
import HeaderSearch from './HeaderSearch'

const Header = styled('header')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: #000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 2;
  height: 50px;
  align-item: center;
  box-shadow: rgb(255 255 255 / 65%) 0px 0px 18px 0px;
  ${mq.medium`
    height: auto;
  `}
`

const HeaderSearchWraaper = styled(HeaderSearch)`
  background-color: transparent;
  width: 100%;
  padding: 0px 20px;
  flex: 8;
  ${mq.medium`
    margin-top: 0;
    padding:0px 20px;
  `}
`

const Logo = styled(DefaultLogo)`
  flex: 1;
  background: transparent;
  position: relative;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-left: 10px;
  ${p =>
    p.isMenuOpen
      ? `
    opacity: 0;
  `
      : ''}

  ${mq.medium`
    width:200px;
  `}
`

function HeaderContainer() {
  const [isMenuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <Header isMenuOpen={isMenuOpen}>
        <Logo />
        <HeaderSearchWraaper />
        <AvatarAndInfoDropdown />
      </Header>
    </>
  )
}

export default HeaderContainer
