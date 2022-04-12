import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled/macro'

import mq, { useMediaMin, useMediaMax } from 'mediaQuery'

import DefaultLogo from '../Logo'
import Search from '../SearchName/Search'
import Hamburger from './Hamburger'
import SideNav from '../SideNav/SideNav'
import Banner from '../Banner'

import { hasNonAscii } from '../../utils/utils'
import LanguageSwitcher from '../LanguageSwitcher'
import AvatarAndInfoDropdown from '../AvatarAndInfoDropdown'

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

const SearchHeader = styled(Search)`
  background-color: transparent;
  width: 100%;
  padding: 0px 20px;
  flex: 7;
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
  width: 100%;
  ${p =>
    p.isMenuOpen
      ? `
    opacity: 0;
  `
      : ''}

  ${mq.medium`
    opacity: 1;
    &:before {
      background: #d3d3d3;
      height: 32px;
      content: '';
      width: 1px;
      right: 35px;
      position: absolute;
    }
  `}
`

function HeaderContainer() {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const mediumBP = useMediaMin('medium')
  const mediumBPMax = useMediaMax('medium')
  const toggleMenu = () => setMenuOpen(!isMenuOpen)
  const { t } = useTranslation()

  return (
    <>
      <Header isMenuOpen={isMenuOpen}>
        <Logo />

        <SearchHeader />
        <AvatarAndInfoDropdown />
      </Header>
    </>
  )
}

export default HeaderContainer
