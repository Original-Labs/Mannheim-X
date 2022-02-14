import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled/macro'
import { useTranslation } from 'react-i18next'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { useHistory } from 'react-router'

import { useMediaMin } from 'mediaQuery'
import { EMPTY_ADDRESS } from '../../utils/records'
import { Title } from '../Typography/Basic'
import TopBar from '../Basic/TopBar'
import DefaultFavourite from '../AddFavourite/Favourite'
import SharedIcon from 'components/Icons/SharedIcon'
import NameDetails from './NameDetails'
import DNSNameRegister from './DNSNameRegister'
import ShortName from './ShortName'
import Tabs from './Tabs'
import NameContainer from '../Basic/MainContainer'
import Copy from '../CopyToClipboard/'
import { isOwnerOfParentDomain } from '../../utils/utils'
import { Link } from 'react-router-dom'
import Loading from 'components/Loading/Loading'
import { Modal } from 'antd'
import 'antd/es/modal/style/css'
import SharedContainer from 'routes/Shared'

const Owner = styled('div')`
  color: #ccd4da;
  margin-right: 20px;
`

const RightBar = styled('div')`
  display: flex;
  align-items: center;
`

const Favourite = styled(DefaultFavourite)``

const SharedIconContainer = styled('div')`
  cursor: pointer;
  line-height: 25px;
  &:active {
    transform: scale(1.2);
    transition: all 0.5s;
  }
`

function isRegistrationOpen(available, parent, isDeedOwner) {
  return parent === 'key' && available
}

function isDNSRegistrationOpen(domain) {
  // const nameArray = domain.name?.split('.')
  // if (nameArray?.length !== 2 || nameArray?.[1] === 'key') {
  //   return false
  // }
  // return domain.isDNSRegistrar && domain.owner === EMPTY_ADDRESS
  return false
}

function isOwnerOfDomain(domain, account) {
  if (domain.owner !== EMPTY_ADDRESS && !domain.available) {
    return domain.owner?.toLowerCase() === account?.toLowerCase()
  }
  return false
}

const NAME_REGISTER_DATA_WRAPPER = gql`
  query nameRegisterDataWrapper @client {
    accounts
    networkId
  }
`

export const useRefreshComponent = () => {
  const [key, setKey] = useState(0)
  const {
    data: { accounts, networkId }
  } = useQuery(NAME_REGISTER_DATA_WRAPPER)
  const mainAccount = accounts?.[0]
  useEffect(() => {
    setKey(x => x + 1)
    let headerElement = document.getElementsByTagName('header')[0]
    let formElement = document.getElementsByTagName('form')[0]
    headerElement.style.display = 'flex'
    formElement.style.display = 'flex'
  }, [mainAccount, networkId])
  return key
}

const NAME_QUERY = gql`
  query nameQuery {
    accounts @client
  }
`

const Share = styled(SharedContainer)``

function Name({ details: domain, name, pathname, type, refetch }) {
  const { t } = useTranslation()
  const [modalVisible, setModalVisible] = useState(false)
  const [modalLoading, setModalLoading] = useState(true)
  const [imageState, setImageState] = useState(
    <Loading loading={modalLoading} size="large">
      <img width="100%" height="300px" />
    </Loading>
  )
  const history = useHistory()
  const smallBP = useMediaMin('small')
  const percentDone = 100

  const {
    data: { accounts }
  } = useQuery(NAME_QUERY)

  const account = accounts?.[0]
  const isOwner = isOwnerOfDomain(domain, account)
  const isOwnerOfParent = isOwnerOfParentDomain(domain, account)
  const isDeedOwner = domain.deedOwner === account
  const isRegistrant = !domain.available && domain.registrant === account

  const registrationOpen = isRegistrationOpen(domain.available, domain.parent)
  const preferredTab = registrationOpen ? 'register' : 'details'

  let ownerType,
    registrarAddress = domain.parentOwner
  // if (isDeedOwner || isRegistrant) {
  //   ownerType = 'Registrant'
  // } else if (isOwner) {
  //   ownerType = 'Controller'
  // }
  ownerType = 'Registrant'
  let containerState
  if (isDNSRegistrationOpen(domain)) {
    containerState = 'Open'
  } else {
    containerState = isOwner ? 'Yours' : domain.state
  }

  const key = useRefreshComponent()

  return (
    <NameContainer state={containerState} key={key}>
      <TopBar percentDone={percentDone}>
        <Title>
          {domain?.decrypted
            ? name
            : '[unknown' +
              domain.name?.split('.')[0].slice(1, 11) +
              ']' +
              '.' +
              domain.parent}
          <Copy
            value={
              domain?.decrypted
                ? name
                : '[unknown' +
                  domain.name?.split('.')[0].slice(1, 11) +
                  ']' +
                  '.' +
                  domain.parent
            }
          />
        </Title>
        <RightBar>
          {!!ownerType && (
            <Owner data-testid="owner-type">
              {ownerType === 'Registrant'
                ? t('c.registrant')
                : t('c.Controller')}
            </Owner>
          )}
          {/* {!smallBP && (
            <SharedIconContainer
              onClick={() => {
                window.localStorage.setItem('domain', JSON.stringify(domain))
                window.localStorage.setItem('isOwner', isOwner)
                window.localStorage.setItem('refetch', refetch)
              }}
              to={{
                pathname: `/shared/${name}`
              }}
            >
              <SharedIcon />
            </SharedIconContainer>
          )} */}
          <SharedIconContainer
            onClick={() => {
              window.localStorage.setItem('domain', JSON.stringify(domain))
              window.localStorage.setItem('isOwner', isOwner)
              window.localStorage.setItem('refetch', refetch)
              if (smallBP) {
                setModalVisible(true)
              } else {
                history.push(`/shared/${name}`)
              }
            }}
          >
            <SharedIcon />
          </SharedIconContainer>
          {smallBP && (
            <Tabs
              pathname={pathname}
              tab={preferredTab}
              domain={domain}
              parent={domain.parent}
            />
          )}
        </RightBar>
      </TopBar>
      {!smallBP && (
        <Tabs
          pathname={pathname}
          tab={preferredTab}
          domain={domain}
          parent={domain.parent}
        />
      )}
      {isDNSRegistrationOpen(domain) ? (
        <DNSNameRegister
          domain={domain}
          registrarAddress={registrarAddress}
          pathname={pathname}
          refetch={refetch}
          account={account}
          readOnly={account === EMPTY_ADDRESS}
        />
      ) : type === 'short' && domain.owner === EMPTY_ADDRESS ? ( // check it's short and hasn't been claimed already
        <ShortName name={name} />
      ) : (
        <NameDetails
          tab={preferredTab}
          domain={domain}
          pathname={pathname}
          name={name}
          isOwner={isOwner}
          isOwnerOfParent={isOwnerOfParent}
          refetch={refetch}
          account={account}
          registrationOpen={registrationOpen}
        />
      )}
      <Modal
        visible={modalVisible}
        width="30%"
        centered
        footer={null}
        bodyStyle={{ width: '60%', margin: '0 auto' }}
        onCancel={() => {
          setModalVisible(false)
          setModalLoading(false)
        }}
      >
        <Share smallBP />
      </Modal>
    </NameContainer>
  )
}

export default Name
