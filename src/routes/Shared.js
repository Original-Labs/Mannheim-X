import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styled from '@emotion/styled/macro'
import shareImg from '../assets/share/shareImg.png'
import backImgItem from '../assets/share/backImgItem.png'
import searchImg from '../assets/share/ShareSearch.png'
import whiteLogo from '../assets/share/whiteLogo.png'
import ploygonGrant from '../assets/share/ploygonGrant.png'
import DiscordIcon from '../assets/D.png'
import TelegramIcon from '../assets/tg.png'
import TwitterIcon from '../assets/t.png'
import QRCode from 'qrcode.react'
import Loading from 'components/Loading/Loading'
import { useTranslation } from 'react-i18next'
import html2canvas from 'html2canvas'
import { Modal } from 'antd'
import 'antd/es/modal/style/css'

const Share = styled('div')`
  position: relative;
  display: block;
  width: 100%;
  background-color: #ea6060;
`

const ShareImg = styled('img')`
  position: absolute;
  ${p => (p.smallBP ? `top:10px;` : `top:-45px;`)}
  right:15px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  &:active {
    transform: scale(1.1);
    color: #dfdfdf;
    transition: all 1s;
  }
  z-index: 999999999;
`

const InnerBackImg = styled('img')`
  position: relative;
  width: 100%;
  height: 80%;
  ${p => (p.smallBP ? `top:0;` : `top:-260px;`)}
`

const ShareTextContainer = styled('div')`
  position: absolute;
  width: 100%;
  height: 500px;
  text-align: center;
  top: 7%;
`

const ShareTitle = styled('div')`
  font-family: Overpass;
  font-weight: 800;
  font-size: 120px;
  line-height: 75px;
  color: #f7f8f8;
`

const ShareSubTitle = styled('div')`
  font-family: Overpass;
  font-weight: 800;
  font-size: 60px;
  color: #3e3a39;
`

const ShareDes = styled('div')`
  font-family: sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 5px;
  color: #f7f8f8;
`

const ShareSign = styled('div')`
  font-family: sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 5px;
  color: #f7f8f8;
  margin-top: 24px;
`

const LogoImg = styled('img')`
  position: relative;
  width: 15px;
  height: 15px;
  top: 1px;
`

const ShareSignText = styled('span')`
  font-family: emoji;
  font-size: 15px;
  padding: 0px 6px;
`

const QRCodeContainer = styled('div')`
  position: relative;
  width: 100%;
  background-color: #fff;
  height: 500px;
`

const QRCodeConent = styled('div')`
  position: relative;
  text-align: center;
  background-color: #fff;
  &:active {
    transform: scale(1.1);
    color: #dfdfdf;
    transition: all 1s;
  }
`

const QRCodeItem = styled(QRCode)`
  margin: 10px auto;
  border-radius: 8px;
  margin-top: 10%;
`

const ShareKeyName = styled('div')`
  position: absolute;
  width: 100%;
  height: 50px;
  span {
    font-family: sans-serif;
    font-size: 19px;
    font-weight: 700;
    border: 1px solid black;
    padding: 5px 12px;
    border-radius: 6px;
  }
  margin-top: 5%;
  left: 50%;
  transform: translateX(-50%);
`

const SearchIcon = styled('img')`
  position: absolute;
  width: 36px;
  height: 36px;
  margin-left: 5px;
  margin-top: -4px;
  backgroud-color: #ea6060;
`

const WebSiteText = styled('div')`
  position:absolute;
  width:100%;
  font-family: Overpass;
  font-weight: 1000;
  font-size:18px;
  margin-top: 17%;
}
`

const SharePolygonImg = styled('img')`
  position: absolute;
  width: 120px;
  height: 18px;
  bottom: 7%;
  left: 50%;
  transform: translateX(-50%);
`

const ShareFooter = styled('div')`
  display: flex;
  bottom: 0;
  height: 37px;
  background-color: #3e3a39;
  justify-content: space-around;
`

const ShareItem = styled('div')`
  color: #fff;
  text-align: center;
  font-size: 13px;
  line-height: 40px;
  font-weight: 1000;
  text-align: center;
  img {
    color: #fff;
    width: 14px;
    height: 14px;
    margin-right: 5px;
  }
`

const ModalTitle = styled('div')`
  text-align: center;
`

function SharedContainer(props) {
  const { smallBP } = props
  const domain = JSON.parse(window.localStorage.getItem('domain'))
  const [modalVisible, setModalVisible] = useState(false)
  const [modalLoading, setModalLoading] = useState(true)
  const [imageState, setImageState] = useState(
    <Loading loading={modalLoading} size="large">
      <img width="100%" height="300px" />
    </Loading>
  )
  const history = useHistory()
  const hostName = window.location.host
  const protocol = window.location.protocol
  const { t } = useTranslation()

  const sharedImg = () => {
    setModalLoading(true)
    let detailElement = document.getElementById('share')
    html2canvas(detailElement, {
      allowTaint: false,
      useCORS: true
    }).then(function(canvas) {
      // toImage
      const dataImg = new Image()
      dataImg.src = canvas.toDataURL('image/png')
      setImageState(<img width="100%" src={dataImg.src} />)
      if (!smallBP) {
        setModalVisible(true)
      } else {
        const alink = document.createElement('a')
        alink.href = dataImg.src
        alink.download = `${domain.name}.png`
        alink.click()
      }
    })
    setModalLoading(false)
  }

  useEffect(() => {
    let headerElement = document.getElementsByTagName('header')[0]
    let formElement = document.getElementsByTagName('form')[0]
    if (!smallBP) {
      headerElement.style.display = 'none'
      formElement.style.display = 'none'
    }
    if (!domain) {
      headerElement.style.display = 'flex'
      formElement.style.display = 'flex'
      history.push(`/`)
    }
  }, [])

  return (
    <Share id="share">
      <ShareImg
        src={shareImg}
        smallBP={smallBP}
        onClick={() => {
          sharedImg()
        }}
      />
      <InnerBackImg src={backImgItem} smallBP={smallBP} />
      <ShareTextContainer>
        <ShareTitle>WEB3</ShareTitle>
        <ShareSubTitle>NAME CARD</ShareSubTitle>
        <ShareDes>Control your own data</ShareDes>
        <ShareSign>
          <LogoImg src={whiteLogo} />
          <ShareSignText>LINKKEY</ShareSignText>
        </ShareSign>
      </ShareTextContainer>
      <QRCodeContainer>
        <QRCodeConent>
          <QRCodeItem
            value={`${protocol}//${hostName}/name/${domain.name}/details`}
            size={110}
            fgColor="#ea6060"
            iconRadius={10}
          />
          <ShareKeyName>
            <span>{domain.name}</span>
            <SearchIcon src={searchImg} />
          </ShareKeyName>
          <WebSiteText>www.sns.chat</WebSiteText>
        </QRCodeConent>
      </QRCodeContainer>
      <SharePolygonImg src={ploygonGrant} />
      <ShareFooter>
        <ShareItem>
          <img src={DiscordIcon} />
          linkkey.io
        </ShareItem>
        <ShareItem>
          <img src={TelegramIcon} />
          @linkkeydao
        </ShareItem>
        <ShareItem>
          <img src={TwitterIcon} />
          @LinkkeyOfficial
        </ShareItem>
      </ShareFooter>
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
    </Share>
  )
}

export default SharedContainer
