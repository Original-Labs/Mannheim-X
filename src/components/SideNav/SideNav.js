import React from 'react'
import styled from '@emotion/styled/macro'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'

import NetworkInformation from '../NetworkInformation/NetworkInformation'
import { aboutPageURL, hasNonAscii } from '../../utils/utils'

import mq from 'mediaQuery'
import { Link, withRouter } from 'react-router-dom'
import gql from 'graphql-tag'

const SideNavContainer = styled('nav')`
  // display: ${p => (p.isMenuOpen ? 'block' : 'none')};
  display: block;
  z-index: 999;
  ${mq.medium`
    z-index: 999;
  `}
  left: 0;
  height: auto;
  background: #212121;
  width: 230px;
  margin-top: -10px;
  border-radius: 14px;
  ${mq.medium`
    padding: 0;
    left: 35px;
    height: auto;
    background: transparent;
    width: 100%;
    display: block;
  `}

  ul {
    padding: 0;
    margin: 0;
    margin-left: 16px;
  }
  li {
    list-style: none;
  }

  ${p =>
    p.hasNonAscii
      ? `
      top: 200px;
      ${mq.medium`top: 200px`}
    `
      : `
      top: 100px;
      ${mq.medium`top: 100px`}
    `}
`

const NavLink = styled(Link)`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: flex-start;
  font-weight: 200;
  font-size: 16px;
  color: ${p => (p.active ? '#ffc107' : '#C7D3E3')};
  padding: 10px 0;

  ${mq.medium`
    justify-content: start;
    border-bottom: 0;
  `}
  ${mq.small`
    justify-content: start;
    border-bottom: 0;
    font-size: 18px;
  `}

  &:visited {
    color: #ffc107;
  }

  span {
    transition: 0.2s;
    margin-left: 15px;
    color: ${p => (p.active ? '#ffc107' : '#C7D3E3')};
  }

  &:hover {
    span {
      color: #ffc107;
    }
    path {
      fill: #ffc107;
    }
    g {
      fill: #ffc107;
    }
  }
`

const SIDENAV_QUERY = gql`
  query getSideNavData {
    accounts
    isReadOnly
  }
`

function SideNav({ match, isMenuOpen, toggleMenu }) {
  const { url } = match
  const { t } = useTranslation()
  const {
    data: { accounts, isReadOnly }
  } = useQuery(SIDENAV_QUERY)

  console.log('isMenuOpen:', isMenuOpen)

  return (
    <SideNavContainer isMenuOpen={isMenuOpen} hasNonAscii={hasNonAscii()}>
      <NetworkInformation />
      <ul data-testid="sitenav">
        {accounts?.length > 0 && !isReadOnly ? (
          <li>
            <NavLink
              onClick={toggleMenu}
              active={url === '/myRecord/' ? 1 : 0}
              to={'/myRecord/'}
            >
              <span>我的认购记录</span>
            </NavLink>
          </li>
        ) : null}
      </ul>
    </SideNavContainer>
  )
}
export default withRouter(SideNav)
