import { Global } from '@emotion/react'
import { inboxStream, outboxStream } from '@logic/socket.js'
import React, { Component } from 'react'

import Room from '../Room'
import * as S from './styled'

class App extends Component {
  constructor(...args) {
    super(...args)
    this.state = {}
  }

  componentDidMount() {
    this.setState({
      inboxStreamSubscription: inboxStream.subscribe((event) => {
        console.log('App', event)
        if (event.type === 'ROOM/JOIN') {
          this.setState({ roomId: event.payload })
        }
      }),
    })
  }

  componentWillUnmount() {
    this.state.inboxStreamSubscription.unsubscribe()
  }

  render() {
    return (
      <>
        <Global styles={S.globalStyles} />
        {this.state.roomId ? <Room /> : null}
      </>
    )
  }
}

export default App
