import React, { Component } from 'react'
import styled from '@emotion/styled/macro'
import { modulate } from '../../utils/utils'
import mq from 'mediaQuery'
import * as PropTypes from 'prop-types'
import Text from 'antd/es/typography/Text'

class MetaTime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: new Date().toLocaleString()
    }
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000)
  }
  componentWillUnmount() {
    clearInterval(this.intervalID)
  }
  tick() {
    this.setState({
      time: new Date().toLocaleString()
    })
  }
  render() {
    return <p className="App-clock">The time is {this.state.time}.</p>
  }
}

export default MetaTime
