import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled/macro'
import mq from 'mediaQuery'
import register3 from 'assets/registerImg/register3.png'
import register4 from 'assets/registerImg/register4.png'
import register5 from 'assets/registerImg/register5.png'
import register6 from 'assets/registerImg/register6.png'
import register7 from 'assets/registerImg/register7.png'
import register8 from 'assets/registerImg/register8.png'
import register9 from 'assets/registerImg/register9.png'

import { H2 as DefaultH2, Title } from '../components/Typography/Basic'

const RegisertProcessContainer = styled('div')`
  display: block;
  margin: 1em;
  padding: 20px 40px;
  background-color: white;
  border-radius: 6px;
`

const H2 = styled(DefaultH2)`
  margin-top: 50px;
  color: #000;
  ${mq.medium`
    margin-left: 0;
  `}
`

const H3 = styled('h3')`
  margin-right: 0.5em;
`

const RegisterImg = styled('img')`
  display: block;
  width: 60%;
  height: 60%;
  margin: 15px auto;
`

function RegisertProcess() {
  const { t } = useTranslation()
  useEffect(() => {
    document.title = 'SNS Register Process'
  }, [])

  return (
    <>
      <RegisertProcessContainer>
        <Title>Regisert Process</Title>
        <H2>{t(`registerPageInfo.NeedToPrepare`)}</H2>
        <H3>{t(`registerPageInfo.NeedToPrepare1`)}</H3>
        <H3>{t(`registerPageInfo.NeedToPrepare2`)}</H3>
        <H2>{t(`registerPageInfo.RegistrationProcess`)}</H2>
        <H3>{t(`registerPageInfo.RegistrationProcess1`)}</H3>
        <H3>{t(`registerPageInfo.RegistrationProcess2`)}</H3>
        <H3>{t(`registerPageInfo.RegistrationProcess3`)}</H3>
        <RegisterImg src={register3} />
        <H3>{t(`registerPageInfo.RegistrationProcess4`)}</H3>
        <RegisterImg src={register4} />
        <H3>{t(`registerPageInfo.RegistrationProcess5`)}</H3>
        <RegisterImg src={register5} />
        <H3>{t(`registerPageInfo.RegistrationProcess6`)}</H3>
        <RegisterImg src={register6} />
        <H3>{t(`registerPageInfo.RegistrationProcess7`)}</H3>
        <RegisterImg src={register7} />
        <H3>{t(`registerPageInfo.RegistrationProcess8`)}</H3>
        <RegisterImg src={register8} />
        <H3>{t(`registerPageInfo.RegistrationProcess9`)}</H3>
        <RegisterImg src={register9} />
        <H2>{t(`registerPageInfo.Note`)}</H2>
        <H3>{t(`registerPageInfo.Note1`)}</H3>
        <H3>{t(`registerPageInfo.Note2`)}</H3>
        <H3>{t(`registerPageInfo.Note3`)}</H3>
      </RegisertProcessContainer>
    </>
  )
}

export default RegisertProcess
