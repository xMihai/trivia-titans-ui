import { inboxStream, outboxStream } from '@logic/socket.js'
import { Button, CardActions, CardContent } from '@mui/material'
import React, { Component } from 'react'
import { filter } from 'rxjs/operators'

import * as S from './styled'

class Room extends Component {
  constructor(...args) {
    super(...args)
    this.state = {}
  }

  resetGame() {
    this.setState({ question: '', answers: null, timeRemaining: null })
  }

  componentDidMount() {
    this.setState({
      roomStreamSubscription: inboxStream.pipe(filter((event) => event.type.startsWith('GAME/'))).subscribe((event) => {
        if (event.type === 'GAME/START') this.resetGame()
        if (event.type === 'GAME/QUESTION') this.setState({ question: event.payload })
        if (event.type === 'GAME/ANSWERS') this.setState({ answers: event.payload })
      }),
    })
  }

  componentWillUnmount() {
    this.state.roomStreamSubscription.unsubscribe()
  }

  render() {
    return (
      <S.Room>
        <S.QuestionCard>
          <CardContent>{this.state.question}</CardContent>
          {this.state.answers ? (
            <CardActions>
              {this.state.answers.map((answer) => (
                <Button key={answer} onMouseDown={() => outboxStream.next({ type: 'GAME/ANSWER', payload: answer })}>
                  {answer}
                </Button>
              ))}
            </CardActions>
          ) : null}
        </S.QuestionCard>
      </S.Room>
    )
  }
}

export default Room
