import React, { useEffect, useState } from 'react'
import { Button, Card, Input, message } from 'antd'
import styled from '@emotion/styled'
import './index.css'
import { getSNSERC20Exchange } from 'apollo/mutations/sns'
import { catchHandle, ERC20ExchangeAddress } from 'utils/utils'

const MyChainAddress = () => {
  const [updateAddress, setUpdateAddress] = useState('')
  const [myChainAddress, setMyChainAddress] = useState('-')

  const getBindAddressFn = async () => {
    const exchangeInstance = await getSNSERC20Exchange(ERC20ExchangeAddress)
    try {
      const newChainAdd = await exchangeInstance.getBindAddress()
      setMyChainAddress(newChainAdd)
    } catch (error) {
      catchHandle(error)
    }
  }

  const setBindAddressFn = async newAdd => {
    const exchangeInstance = await getSNSERC20Exchange(ERC20ExchangeAddress)
    try {
      await exchangeInstance.setBindAddress(newAdd)
      setMyChainAddress(newAdd)
      setUpdateAddress(null)
    } catch (error) {
      console.log('setBindAddressError:', error)
      catchHandle(error)
    }
  }

  useEffect(() => {
    getBindAddressFn()
  }, [])

  return (
    <MyChainAddWrapper>
      <Card title="新链收款地址信息" className="CardWrapper">
        <div>新链收款地址: {myChainAddress}</div>
        <div className="inputAndBtnWrapper">
          <Input
            value={updateAddress}
            onChange={e => {
              setUpdateAddress(e.target.value)
            }}
          />
          <ButtonWrapper
            onClick={async () => {
              if (updateAddress.length === 0) {
                message.error('新币收款地址为必填项!')
              } else {
                setBindAddressFn(updateAddress)
              }
            }}
          >
            修改地址
          </ButtonWrapper>
        </div>
      </Card>
    </MyChainAddWrapper>
  )
}

export default MyChainAddress

const ButtonWrapper = styled(Button)`
  margin-left: 20px;
  border-radius: 16px;
  background-color: #212112 !important;
  color: #ffc107 !important;

  &:hover {
    background-color: #212112 !important;
    color: #ffc107 !important;
  }

  &:active {
    color: #fff !important;
  }
`

const MyChainAddWrapper = styled('div')`
  padding: 20px;
`
