import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled/macro'
import mq, { useMediaMin, useMediaMax } from 'mediaQuery'
import searchIcon from '../../assets/search.png'
import { gql, useQuery } from '@apollo/client'

const SEARCH_QUERY = gql`
  query searchQuery {
    isENSReady @client
  }
`

function HeaderSearch({ className, style }) {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [inputValue, setInputValue] = useState(null)
  const mediumBP = useMediaMin('medium')
  const mediumBPMax = useMediaMax('medium')
  const { t } = useTranslation()
  const {
    data: { isENSReady }
  } = useQuery(SEARCH_QUERY)

  let input
  const hasSearch = inputValue && inputValue.length > 0 && isENSReady

  return (
    <SearchForm
      className={className}
      style={style}
      hasSearch={hasSearch}
      mediumBP={mediumBP}
      mediumBPMax={mediumBPMax}
    >
      <input
        placeholder={t('search.placeholder')}
        ref={el => (input = el)}
        onChange={e => {
          setInputValue(e.target.value)
        }}
      />
      <button disabled={!hasSearch}>
        {mediumBP ? t('search.button') : <img src={searchIcon} alt="search" />}
      </button>
    </SearchForm>
  )
}

export default HeaderSearch

const SearchForm = styled('div')`
  display: flex;
  position: relative;
  ${p => (p && p.pathName === '/' ? ` z-index:100;` : ``)}
  align-self:center;

  &:before {
    content: '';
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translate(0, -50%);
    display: block;
    width: 27px;
    height: 27px;
  }

  input {
    padding: 20px 10px;
    width: 100%;
    height: 35px;
    border: none;
    border-radius: 14px 0 0 14px;
    font-size: 14px;
    font-family: Overpass;
    font-weight: bold;
    padding: 3px 15px 0;
    color: #ffc107;
    background: #605a5a;
    ${mq.medium`
      width: calc(600px - 162px);
      height:45px;
      font-size: 18px;
      font-weight:500;
      padding: 3px 15px 0;
    `}

    &:focus {
      outline: 0;
    }

    &::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: #ffc107;
      line-height: 33px;
      font-weight: 500;
      ${p => (p && p.mediumBP ? 'font-size:16px;' : 'font-size:14px;')}
    }
  }

  button {
    ${p =>
      p && p.hasSearch
        ? 'background: #ffc107;color: #000;'
        : 'background: #ffc107; color:#605a5a;'}
    font-size: 18px;
    font-weight: bold;
    height: 35px;
    font-family: 'Permanent Marker', cursive;
    line-height: 33px;
    width: calc(350px - 240px);
    border: none;
    border-radius: 0 14px 14px 0;
    ${mq.medium`
      display: block;
      width: 115px;
      height: 45px;
      line-height: 47px;
      border-radius: 0 14px 14px 0;
    `}
    &:hover {
      ${p => (p && p.hasSearch ? 'cursor: pointer;' : 'cursor: default;')}
    }
    &:active {
      ${p => (p && p.hasSearch ? 'background:#ffc107aa;' : '')}
    }
    img {
      width: 25px;
      height: 25px;
    }
  }
`
