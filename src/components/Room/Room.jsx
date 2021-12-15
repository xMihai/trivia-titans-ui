import { inboxStream, outboxStream } from '@logic/socket.js'
import { Button } from '@mui/material'
import React, { Component } from 'react'
import { filter } from 'rxjs/operators'

import * as S from './styled'

const defaultState = { question: '', options: null, timeRemaining: null, buttonStates: [null, null, null, null] }
const buttonStateColors = {
  CORRECT: 'success',
  INCORRECT: 'error',
  KNOWN_INCORRECT: 'error',
  UNKNWON: 'primary',
  KNOWN_CORRECT: 'success',
}
const buttonStateVariants = {
  CORRECT: 'contained',
  INCORRECT: 'contained',
  KNOWN_INCORRECT: 'outlined',
  UNKNOWN: 'outlined',
  KNOWN_CORRECT: 'outlined',
}

class Room extends Component {
  constructor(...args) {
    super(...args)
    this.state = { ...defaultState }
  }

  resetGame() {
    this.setState({ ...defaultState })
  }

  updateWithSolution(payload) {
    const index = this.state.options.indexOf(payload.answer)
    this.setState({
      buttonStates: this.state.buttonStates.map((_, i) =>
        i === index ? payload.status : payload.status === 'CORRECT' ? 'KNOWN_INCORRECT' : 'UNKNOWN'
      ),
    })
  }

  updateWithResults(payload) {
    const index = this.state.options.indexOf(payload.correctAnswer)
    if (this.state.buttonStates[index] !== 'CORRECT')
      this.setState({
        buttonStates: this.state.buttonStates.map((buttonState, i) => (i === index ? 'KNOWN_CORRECT' : buttonState)),
      })
  }

  componentDidMount() {
    this.setState({
      roomStreamSubscription: inboxStream.pipe(filter((event) => event.type.startsWith('GAME/'))).subscribe((event) => {
        if (event.type === 'GAME/START') this.resetGame()
        if (event.type === 'GAME/QUESTION') this.setState({ question: event.payload })
        if (event.type === 'GAME/OPTIONS') this.setState({ options: event.payload })
        if (event.type === 'GAME/UPDATE')
          this.setState({ question: event.payload.question, options: event.payload.options })
        if (event.type === 'GAME/SOLUTION') this.updateWithSolution(event.payload)
        if (event.type === 'GAME/RESULTS') this.updateWithResults(event.payload)
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
            <S.QuestionCardOptions>
              {this.state.options.map((answer, i) => (
                <Button
                  key={answer}
                  color={buttonStateColors[this.state.buttonStates[i]] || 'primary'}
                  variant={buttonStateVariants[this.state.buttonStates[i]] || 'contained'}
                  onMouseDown={() => outboxStream.next({ type: 'GAME/ANSWER', payload: answer })}
                >
                  {answer}
                </Button>
              ))}
            </S.QuestionCardOptions>
          ) : null}
        </S.QuestionCard>
      </S.Room>
    )
  }
}

export default Room
