import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styled from '@emotion/styled/macro'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import mq from '../../src/mediaQuery'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { Modal } from 'antd'
import 'antd/es/modal/style/css'

import html2canvas from 'html2canvas'
import {
  DetailsItem,
  DetailsKey,
  DetailsValue
} from '../../src/components/SingleName/DetailsItem'
import DetailsItemEditable from '../../src/components/SingleName/DetailsItemEditable'
import { RENEW, SET_REGISTRANT } from '../../src/graphql/mutations'
import { IS_MIGRATED } from '../../src/graphql/queries'
import { HR } from '../../src/components/Typography/Basic'
import dnssecmodes from '../../src/api/dnssecmodes'
import { formatDate } from '../../src/utils/dates'
import { containZeroWidthStr } from '../../src/utils/utils'
import ResolverAndRecords from '../../src/components/SingleName/ResolverAndRecords'
import NameClaimTestDomain from '../../src/components/SingleName/NameClaimTestDomain'
import QRCode from 'qrcode.react'
import Loading from 'components/Loading/Loading'

const Details = styled('section')`
  padding: 20px;
  background-color: white;
  height: 100%;
  margin-top: -60px;
  transition: 0.4s;
  ${mq.small`
    padding: 40px;
  `}
  z-index:9999999;
`

const OwnerFields = styled('div')`
  background: ${props => (props.outOfSync ? '#fef7e9' : '')};
  padding: ${props => (props.outOfSync ? '1.5em' : '0')};
  margin-bottom: ${props => (props.outOfSync ? '1.5em' : '0')};
`

const NAME_QUERY = gql`
  query nameQuery {
    accounts @client
  }
`

const QRCodeContainer = styled('div')`
  text-align: center;
  div {
    font-family: Overpass;
    font-weight: 300;
    color: #2b2b2b;
    margin-bottom: 20px;
  }
  &:active {
    transform: scale(1.1);
    color: #dfdfdf;
    transition: all 1s;
  }
`

const QRCodeItem = styled(QRCode)`
  margin: 10px auto;
`

const ModalTitle = styled('div')`
  text-align: center;
`

function SharedContainer() {
  const domain = JSON.parse(window.localStorage.getItem('domain'))
  const isOwner = window.localStorage.getItem('isOwner')
  const refetch = window.localStorage.getItem('refetch')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalLoading, setModalLoading] = useState(true)
  const [imageState, setImageState] = useState(
    <Loading loading={modalLoading} size="large">
      <img width="100%" height="300px" />
    </Loading>
  )
  const history = useHistory()
  if (!domain || !isOwner || !refetch) {
    history.push(`/`)
  }
  const hostName = window.location.host
  const protocol = window.location.protocol
  const { t } = useTranslation()
  const {
    data: { isMigrated } = {},
    loading: loadingIsMigrated,
    refetch: refetchIsMigrated
  } = useQuery(IS_MIGRATED, {
    variables: {
      name: domain.name
    }
  })

  const {
    data: { accounts }
  } = useQuery(NAME_QUERY)

  const isExpired = false
  const account = accounts?.[0]
  const isMigratedToNewRegistry = !loadingIsMigrated && isMigrated
  const isLoggedIn = parseInt(account) !== 0
  const domainParent =
    domain.name === '[root]' ? null : domain.parent ? domain.parent : '[root]'
  const registrant =
    domain.available || domain.registrant === '0x0' ? null : domain.registrant
  const isRegistrant = !domain.available && domain.registrant === account

  const GracePeriodWarning = ({ date, expiryTime }) => {
    let { t } = useTranslation()
    let isExpired = new Date() > new Date(expiryTime)
    return (
      <GracePeriodWarningContainer isExpired={isExpired}>
        <Expiration isExpired={isExpired}>
          {isExpired
            ? t('singleName.expiry.expired')
            : t('singleName.expiry.expiringSoon')}
        </Expiration>
        <GracePeriodText isExpired={isExpired}>
          {t('singleName.expiry.gracePeriodEnds')}{' '}
          <GracePeriodDate>{formatDate(date)}</GracePeriodDate>
        </GracePeriodText>
      </GracePeriodWarningContainer>
    )
  }

  function canClaim(domain) {
    if (!domain.name?.match(/\.test$/)) return false
    return parseInt(domain.owner) === 0 || domain.expiryTime < new Date()
  }

  const sharedImg = () => {
    let detailElement = document.getElementsByTagName('section')[0]
    html2canvas(detailElement, {
      allowTaint: false,
      useCORS: true
    }).then(function(canvas) {
      // toImage
      const dataImg = new Image()
      dataImg.src = canvas.toDataURL('image/png')
      setImageState(<img width="100%" src={dataImg.src} />)
    })
  }

  useEffect(() => {
    let headerElement = document.getElementsByTagName('header')[0]
    let formElement = document.getElementsByTagName('form')[0]
    headerElement.style.display = 'none'
    formElement.style.display = 'none'
    if (!domain || !isOwner || !refetch) {
      headerElement.style.display = 'flex'
      formElement.style.display = 'flex'
      history.push(`/`)
    }
  }, [])

  const containZeroWidth = containZeroWidthStr(domain.name)
  const encodeName = encodeURI(domain.name)
  const showExplainer = !parseInt(domain.resolver)

  let dnssecmode, canSubmit
  if ([5, 6].includes(domain.state) && !isMigrated) {
    dnssecmode = dnssecmodes[7]
    canSubmit =
      isLoggedIn && domain.isDNSRegistrar && dnssecmode.state === 'SUBMIT_PROOF'
  } else {
    dnssecmode = dnssecmodes[domain.state]
    canSubmit =
      isLoggedIn &&
      domain.isDNSRegistrar &&
      dnssecmode.state === 'SUBMIT_PROOF' && // This is for not allowing the case user does not have record rather than having empty address record.
      domain.owner.toLowerCase() !== domain.dnsOwner.toLowerCase()
  }
  const outOfSync = dnssecmode && dnssecmode.outOfSync

  return (
    <Details data-testid="name-details">
      {containZeroWidth ? (
        <ZeroWidth>
          {' '}
          ⚠️{t('singleName.containZeroWidth')} + {encodeName}{' '}
        </ZeroWidth>
      ) : (
        ''
      )}
      {/* {isOwner && <SetupName initialState={showExplainer} />} */}
      <QRCodeContainer
        onClick={() => {
          setModalLoading(true)
          sharedImg()
          setModalVisible(true)
          setModalLoading(false)
        }}
      >
        <QRCodeItem
          value={`${protocol}//${hostName}/name/${domain.name}/details`}
          size={200}
          fgColor="#ea6060"
        />
        <div>{t('c.clickToQRCode')}</div>
      </QRCodeContainer>
      {domainParent ? (
        <DetailsItem uneditable>
          <DetailsKey>{t('c.parent')}</DetailsKey>
          <DetailsValue>
            <Link to={`/name/${domainParent}`}>{domainParent}</Link>
          </DetailsValue>
        </DetailsItem>
      ) : (
        ''
      )}
      <OwnerFields outOfSync={outOfSync}>
        <>
          <DetailsItemEditable
            domain={domain}
            keyName="registrant"
            value={registrant}
            canEdit={isOwner}
            isExpiredRegistrant={isRegistrant && isExpired}
            type="address"
            editButton={t('c.transfer')}
            mutationButton={t('c.transfer')}
            mutation={SET_REGISTRANT}
            refetch={refetch}
            confirm={true}
            copyToClipboard={true}
          />
        </>
        {domain.registrationDate ? (
          <DetailsItem uneditable>
            <DetailsKey>{t('c.registrationDate')}</DetailsKey>
            <DetailsValue>{formatDate(domain.registrationDate)}</DetailsValue>
          </DetailsItem>
        ) : (
          ''
        )}
        {!domain.available ? (
          domain.isNewRegistrar || domain.gracePeriodEndDate ? (
            <>
              <DetailsItemEditable
                domain={domain}
                keyName="Expiration Date"
                value={domain.expiryTime}
                canEdit={parseInt(account, 16) !== 0}
                type="date"
                editButton={t('c.renew')}
                mutationButton={t('c.renew')}
                mutation={RENEW}
                refetch={refetch}
                confirm={true}
              />
              {domain.gracePeriodEndDate ? (
                <GracePeriodWarning
                  expiryTime={domain.expiryTime}
                  date={domain.gracePeriodEndDate}
                />
              ) : (
                ''
              )}
            </>
          ) : domain.expiryTime ? (
            <DetailsItem uneditable>
              <DetailsKey>{t("c['Expiration Date']")}</DetailsKey>
              <ExpirationDetailsValue isExpired={isExpired}>
                {formatDate(domain.expiryTime)}
              </ExpirationDetailsValue>
            </DetailsItem>
          ) : (
            ''
          )
        ) : (
          ''
        )}
      </OwnerFields>
      <HR />
      <ResolverAndRecords
        domain={domain}
        isOwner={isOwner}
        refetch={refetch}
        account={account}
        isMigratedToNewRegistry={isMigratedToNewRegistry}
      />
      {canClaim(domain) ? (
        <NameClaimTestDomain domain={domain} refetch={refetch} />
      ) : null}
      <Modal
        title={<ModalTitle>{t('c.pressSaveImg')}</ModalTitle>}
        width="80%"
        visible={modalVisible}
        centered
        footer={null}
        bodyStyle={{ padding: '0px' }}
        onCancel={() => {
          setModalVisible(false)
          setModalLoading(false)
        }}
      >
        {imageState}
      </Modal>
    </Details>
  )
}

export default SharedContainer
