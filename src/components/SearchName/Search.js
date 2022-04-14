import React, { useState } from 'react'
import styled from '@emotion/styled/macro'
import { useTranslation } from 'react-i18next'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client'

import { parseSearchTerm } from '../../utils/utils'
import '../../api/subDomainRegistrar'
import { withRouter } from 'react-router'
import searchIcon from '../../assets/search.png'
import mq, { useMediaMin, useMediaMax } from 'mediaQuery'

const SearchForm = styled('form')`
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

const SEARCH_QUERY = gql`
  query searchQuery {
    isENSReady @client
  }
`

function Search({ history, className, style }) {
  const mediumBP = useMediaMin('medium')
  const mediumBPMax = useMediaMax('medium')
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState(null)
  const [foucsState, setFoucsState] = useState(false)
  const {
    data: { isENSReady }
  } = useQuery(SEARCH_QUERY)
  let input
  const handleParse = e => {
    setInputValue(
      e.target.value
        .split('.')
        .map(term => term.trim())
        .join('.')
    )
  }

  const hasSearch = inputValue && inputValue.length > 0 && isENSReady
  return (
    <>
      <SearchForm
        className={className}
        style={style}
        action="#"
        hasSearch={hasSearch}
        pathName={history.location.pathname}
        mediumBP={mediumBP}
        mediumBPMax={mediumBPMax}
        onSubmit={async e => {
          e.preventDefault()
          if (!hasSearch) return
          const type = await parseSearchTerm(inputValue)
          let searchTerm
          if (input && input.value) {
            // inputValue doesn't have potential whitespace
            searchTerm = inputValue.toLowerCase()
          }
          if (!searchTerm || searchTerm.length < 1) {
            return
          }

          if (type === 'address') {
            history.push(`/address/${searchTerm}`)
            return
          }

          input.value = ''
          if (type === 'supported' || type === 'short') {
            history.push(`/name/${searchTerm}`)
            return
          } else {
            let suffix
            if (searchTerm.split('.').length === 1) {
              suffix = searchTerm + '.key'
            } else {
              suffix = searchTerm
            }
            history.push(`/name/${suffix}`)
          }
        }}
      >
        <input
          placeholder={t('search.placeholder')}
          ref={el => (input = el)}
          onChange={handleParse}
          onFocus={() => setFoucsState(true)}
          onBlur={() => setFoucsState(false)}
        />
        <button
          disabled={!hasSearch}
          type="submit"
          data-testid={'home-search-button'}
        >
          {mediumBP ? (
            t('search.button')
          ) : (
            <img src={searchIcon} alt="search" />
          )}
        </button>
      </SearchForm>
    </>
  )
}

const SearchWithRouter = withRouter(Search)

const SearchContainer = ({ searchDomain, className, style }) => {
  return (
    <SearchWithRouter
      searchDomain={searchDomain}
      className={className}
      style={style}
    />
  )
}

export { SearchWithRouter as Search }

export default SearchContainer
