import React from 'react'
import { Query } from '@apollo/client/react/components'
import { useQuery } from '@apollo/client'
import DomainItem from '../DomainItem/DomainItem'
import { GET_FAVOURITES, GET_SINGLE_NAME } from '../../graphql/queries'
import Loading from 'components/Loading/Loading'
import styled from '@emotion/styled/macro'

const BlankLoadingContainer = styled('div')`
  width: 100%;
  margin-top: 50px;
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
      <Loading loading={true} defaultColor="white" size="large">
        <BlankLoadingContainer />
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
