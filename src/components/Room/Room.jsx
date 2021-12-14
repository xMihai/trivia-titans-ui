import { inboxStream, outboxStream } from '@logic/socket.js'
import { Button, CardActions, CardContent } from '@mui/material'
import React, { Component } from 'react'
import { filter } from 'rxjs/operators'

import * as S from './styled'

const defaultState = { question: '', options: null, timeRemaining: null, buttonStates: [] }
const buttonStateColors = { CORRECT: 'success', INCORRECT: 'error' }

class Room extends Component {
  constructor(...args) {
    super(...args)
    this.state = { ...defaultState }
  }

  resetGame() {
    this.setState({ ...defaultState })
  }

  updateAnswer(payload) {
    const index = this.state.options.indexOf(payload.answer)
    const buttonStates = [...this.state.buttonStates]
    buttonStates[index] = payload.status
    this.setState({ buttonStates })
  }

  componentDidMount() {
    this.setState({
      roomStreamSubscription: inboxStream.pipe(filter((event) => event.type.startsWith('GAME/'))).subscribe((event) => {
        if (event.type === 'GAME/START') this.resetGame()
        if (event.type === 'GAME/QUESTION') this.setState({ question: event.payload })
        if (event.type === 'GAME/OPTIONS') this.setState({ options: event.payload })
        if (event.type === 'GAME/UPDATE')
          this.setState({ question: event.payload.question, options: event.payload.options })
        if (event.type === 'GAME/SOLUTION') this.updateAnswer(event.payload)
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
          <S.QuestionCardContent>{this.state.question}</S.QuestionCardContent>
          {this.state.options ? (
            <CardActions>
              {this.state.options.map((answer, i) => (
                <Button
                  key={answer}
                  color={buttonStateColors[this.state.buttonStates[i]] || 'primary'}
                  onMouseDown={() => outboxStream.next({ type: 'GAME/ANSWER', payload: answer })}
                >
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
