import React from 'react'
import { Query } from '@apollo/client/react/components'
import { useQuery } from '@apollo/client'
import DomainItem from '../DomainItem/DomainItem'
import { GET_FAVOURITES, GET_SINGLE_NAME } from '../../graphql/queries'
import Loading from 'components/Loading/Loading'
import styled from '@emotion/styled/macro'
import mq, { useMediaMin, useMediaMax } from 'mediaQuery'

const BlankLoadingContainer = styled('div')`
  width: 100%;
  margin-top: 50px;
`

const DomainContainer = styled('div')`
  &:before {
    content: '';
    background: #42e068;
    width: 4px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  color: #2b2b2b;
  padding: 20px;
  overflow: hidden;
  position: relative;
  background-color: white;
  border-radius: 6px;
  height: 65px;
  display: grid;
  height: auto;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  align-items: center;
  font-size: 22px;
  margin-bottom: 4px;
  transition: 0.2s all;

  ${mq.medium`
    grid-template-columns: 1fr minmax(150px,350px) 100px 50px 50px;
    grid-template-rows: 39px;
  `}

  color: #2b2b2b;
  z-index: 1;
  box-shadow: 3px 4px 20px 0 rgba(144, 171, 191, 0.42);
  .label-container {
    display: flex;
  }

  &:visited {
    color: #2b2b2b;
  }
`

export const DomainInfo = ({ domainState, isFavourite, loading }) => {
  return (
    <DomainItem
      loading={loading}
      domain={domainState}
      isFavourite={isFavourite}
    />
  )
}

//TODO: create a file for shared client queries

const DomainItemContainer = ({ singleName, searchTerm }) => {
  const {
    data: { favourites },
    loading
  } = useQuery(GET_FAVOURITES, {
    name: searchTerm
  })

  return (
    <DomainItem
      loading={loading}
      domain={singleName}
      isFavourite={
        singleName &&
        favourites &&
        favourites.filter(domain => domain.name === singleName.name).length > 0
      }
    />
  )
}

const DomainInfoContainer = ({ searchTerm }) => {
  const { data, loading, error } = useQuery(GET_SINGLE_NAME, {
    variables: {
      name: searchTerm
    }
  })

  if (loading || !data)
    return (
      <Loading loading={true} size="large">
        <DomainContainer>Loading...</DomainContainer>
      </Loading>
    )
  if (error) {
    console.error(error)
    return null
  }
  const { singleName } = data
  console.log('data:', data)

  return <DomainItemContainer {...{ singleName, searchTerm }} />
}

export default DomainInfoContainer
