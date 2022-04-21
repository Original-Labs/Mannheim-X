import React from 'react'
import { Redirect } from 'react-router-dom'

import { useAccount } from '../components/QueryAccount'
import Banner from '../components/Banner'
import { emptyAddress } from '../utils/utils'

export default function Renew(props) {
  const account = useAccount()
  if (account !== emptyAddress) {
    return <Redirect to={'/'} />
  }
  return (
    <Banner>
      You are here because of a transaction you completed. Please login to your
      wallet to be redirected
    </Banner>
  )
}
