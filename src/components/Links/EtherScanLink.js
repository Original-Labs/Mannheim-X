import React from 'react'
import styled from '@emotion/styled/macro'
import { ReactComponent as ExternalLinkIcon } from '../Icons/externalLink.svg'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client'

const EtherScanLinkContainer = styled('a')`
  display: inline-block;
  align-items: center;
  text-overflow: ellipsis;
`

export const GET_ETHER_SCAN_LINK = gql`
  query getEtherScanLink @client {
    network
  }
`

const EtherScanLink = ({ children, address, className }) => {
  const {
    data: { network }
  } = useQuery(GET_ETHER_SCAN_LINK)
  const subdomain = network?.toLowerCase() === 'main' ? '' : `${network}.`
  return (
    <EtherScanLinkContainer
      data-testid="ether-scan-link-container"
      target="_blank"
      rel="noopener"
      href={`https://polygonscan.com/address/${address}`}
      className={className}
    >
      {children}
      {/* <ExternalLinkIcon /> */}
    </EtherScanLinkContainer>
  )
}

export default EtherScanLink
