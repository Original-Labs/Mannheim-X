import React, { useState } from 'react'
import mq from 'mediaQuery'
import {
  Card,
  Avatar,
  Progress,
  Alert,
  Input,
  InputNumber,
  Button,
  Modal
} from 'antd'
import './index.css'
import styled from '@emotion/styled'
import AlertBanner from 'components/AlertBanner'

export default () => {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <DetailsContainer>
      <AlertBanner />

      <CardDetailsContainer
        title={
          <>
            <Avatar src="https://joeschmoe.io/api/v1/random" />
            <Title> #认购池ASD</Title>
          </>
        }
        extra={<Progress type="circle" percent={30} width={40} />}
      >
        <div>已认购数量: 888 | 剩余122</div>
        <div>
          认购池专属链接:{' '}
          <a href="https://www.baidu.com" target="_blank">
            百度
          </a>
        </div>

        <PuchaseAndDestroy>
          <InpAndBtnWrapper>
            <PushchaseAndDestroyText>可销毁的数量:200</PushchaseAndDestroyText>
            <InpAndBtnCompact>
              <Input.Group compact>
                <Input disabled value="200" style={{ width: '50px' }} />
                <InputNumber
                  addonAfter="份"
                  defaultValue={1}
                  style={{ width: '90px' }}
                  min="0"
                  controls={false}
                  precision={0}
                />
              </Input.Group>
              <ButtonWrapper type="primary">销毁</ButtonWrapper>
            </InpAndBtnCompact>
          </InpAndBtnWrapper>

          <InpAndBtnWrapper>
            <PushchaseAndDestroyText>可认购的数量:200</PushchaseAndDestroyText>
            <InpAndBtnCompact>
              <Input.Group compact>
                <Input disabled value="200" style={{ width: '50px' }} />
                <InputNumber
                  addonAfter="份"
                  defaultValue={1}
                  style={{ width: '90px' }}
                  min="0"
                  controls={false}
                  precision={0}
                />
              </Input.Group>
              <ButtonWrapper
                type="primary"
                onClick={() => {
                  setModalVisible(true)
                }}
              >
                认购
              </ButtonWrapper>
            </InpAndBtnCompact>
          </InpAndBtnWrapper>
        </PuchaseAndDestroy>

        <AlertWrapper
          description="注：认购新币前需销毁旧币，每销毁1枚旧币可获得200枚新币认购资格。"
          type="warning"
        />
      </CardDetailsContainer>
      <Modal
        title="认购详情"
        width={300}
        maskClosable={false}
        style={{ top: '30vh' }}
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false)
        }}
        okButtonProps={{
          shape: 'round'
        }}
        onCancel={() => {
          setModalVisible(false)
        }}
        cancelButtonProps={{
          shape: 'round'
        }}
      >
        <div>认购数量:200 X 3份 = 600</div>
        <div>剩余可认购数量: xxx</div>
        <div>需支付: 0.3 U X 600 = 180 U</div>
      </Modal>
    </DetailsContainer>
  )
}

const DetailsContainer = styled('div')`
  padding: 20px;
  ${mq.medium`
        min-width:1300px;
    `}
`

const CardDetailsContainer = styled(Card)`
  margin: 10px 0;
  &:hover a {
    color: #da0037;
  }
`

const Title = styled('div')`
  display: inline-block;
  height: 32px;
  margin-left: 10px;
  line-height: 32px;
`

const PuchaseAndDestroy = styled('div')`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  ${mq.medium`
        justify-content:space-around;
        flex-wrap:nowrap;
    `}
`

const InpAndBtnWrapper = styled('div')`
  margin: 20px 0;
`

const PushchaseAndDestroyText = styled('div')`
  margin-bottom: 10px;
`

const InpAndBtnCompact = styled('div')`
  display: flex;
  justify-content: space-around;
`

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

const AlertWrapper = styled(Alert)`
  border-radius: 16px;
`
