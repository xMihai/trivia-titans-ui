import { ThemeProvider } from '@material-ui/core'
import React, { Component } from 'react'
// eslint-disable-next-line import/no-unresolved
import { io } from 'socket.io-client'

import * as S from './styled'

class App extends Component {
  constructor(...args) {
    super(...args)
    const socket = io('http://localhost:3000')
    socket.on('connect', () => {
      console.log(socket.id)
    })

    socket.on('disconnect', () => {
      console.log(socket.id)
    })
  }

  render() {
    return (
      <S.Wrapper>
        <S.GlobalStyle />
        <ThemeProvider {...{ theme: S.theme }}>Hello3</ThemeProvider>
      </S.Wrapper>
    )
  }
}

export default App
