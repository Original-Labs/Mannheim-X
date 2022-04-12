import React, { useState } from 'react'
import mq, { useMediaMin } from 'mediaQuery'
import { Card, Avatar, Row, Col } from 'antd'
import './index.css'
import styled from '@emotion/styled'

const { Meta } = Card

export default ({ match }) => {
  const mediumBP = useMediaMin('medium')
  return (
    <div className="MyRecordContainer">
      <Card title="认购汇总" className="CardTotalContainer">
        <div>认购总数:</div>
        <div>销毁总数:</div>
        <div>支付总金额:</div>
      </Card>
      <Card
        title={
          <>
            <Avatar src="https://joeschmoe.io/api/v1/random" />
            <Title>认购池名称</Title>
          </>
        }
        className="transRecord"
        size="small"
      >
        <Row gutter={16}>
          <Col span={12}>认购数:</Col>
          <Col span={12}>销毁数:</Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>支付金额:</Col>
          <Col span={12}>交易时间:</Col>
        </Row>
        <div>交易哈希:</div>
      </Card>
    </div>
  )
}

const Title = styled('div')`
  display: inline-block;
  height: 32px;
  margin-left: 10px;
  line-height: 32px;
`
