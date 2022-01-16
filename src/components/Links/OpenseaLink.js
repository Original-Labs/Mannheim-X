import React from 'react'
import styled from '@emotion/styled/macro'
import { ReactComponent as ExternalLinkIcon } from '../Icons/externalLink.svg'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client'

const OpenseaLinkContainer = styled('a')`
  display: inline-block;
  align-items: center;
  text-overflow: ellipsis;

  svg {
    margin-left: 10px;
    transition: 0.1s;
    opacity: 0;
    flex-shrink: 0;
  }

  &:hover {
    svg {
      opacity: 1;
    }
  }
`

export const GET_OPENSEA_LINK = gql`
  query getOpenseaLink @client {
    network
  }
`

const OpenseaLink = ({ children, className }) => {
  const {
    data: { network }
  } = useQuery(GET_OPENSEA_LINK)
  const subdomain = network?.toLowerCase() === 'main' ? '' : `${network}.`
  return (
    <OpenseaLinkContainer
      data-testid="ether-scan-link-container"
      target="_blank"
      rel="noopener"
      href={`https://opensea.io/collection/snskey`}
      className={className}
    >
      {children}
      {/*<ExternalLinkIcon />*/}
    </OpenseaLinkContainer>
  )
}

export default OpenseaLink
