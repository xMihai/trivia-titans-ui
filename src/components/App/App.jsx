import { Global } from '@emotion/react'
import { inboxStream, outboxStream } from '@logic/socket.js'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import React, { Component } from 'react'

import Room from '../Room'
import * as S from './styled'

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(62, 104, 150, 0.35)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.9)',
        },
      },
    },
  },
})

class App extends Component {
  constructor(...args) {
    super(...args)
    this.state = {}
  }

  componentDidMount() {
    this.setState({
      inboxStreamSubscription: inboxStream.subscribe((event) => {
        if (event.type === 'GAME/INVITE') {
          this.setState({ roomId: event.payload })
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
        {this.state.roomId ? (
          <ThemeProvider theme={theme}>
            <Room {...{ roomId: this.state.roomId }} />
          </ThemeProvider>
        ) : null}
      </>
    )
  }
}

export default App
