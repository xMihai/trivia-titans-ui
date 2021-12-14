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
        if (event.type === 'GAME/INVITE') {
          this.setState({ gameId: event.payload })
          outboxStream.next({ type: 'GAME/KNOCK', payload: event.payload })
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
        {this.state.gameId ? <Room /> : null}
      </>
    )
  }
}

export default App
