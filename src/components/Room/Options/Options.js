import { inboxStream, outboxStream } from '@logic/socket.js'
import { Grid } from '@mui/material'
import React, { Component } from 'react'

import * as S from './styled'

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

const defaultState = { options: null, buttonStates: [null, null, null, null] }

class Options extends Component {
  constructor(...args) {
    super(...args)
    this.state = { ...defaultState }
  }

  resetGame() {
    this.setState(defaultState)
  }

  updateWithSolution(payload) {
    const index = this.state.options.indexOf(payload.option)
    this.setState({
      buttonStates: this.state.buttonStates.map((buttonState, i) =>
        i === index ? payload.status : payload.status === 'CORRECT' ? 'KNOWN_INCORRECT' : buttonState
      ),
    })
  }

  updateWithFinalSolution(payload) {
    const index = this.state.options.indexOf(payload)
    this.setState({
      buttonStates: this.state.buttonStates.map((buttonState, i) =>
        i === index
          ? buttonState === 'CORRECT'
            ? buttonState
            : 'KNOWN_CORRECT'
          : buttonState === 'INCORRECT'
          ? buttonState
          : 'KNOWN_INCORRECT'
      ),
    })
  }

  // updateWithResults(payload) {
  //   const index = this.state.options.indexOf(payload.correctAnswer)
  //   if (this.state.buttonStates[index] !== 'CORRECT')
  //     this.setState({
  //       buttonStates: this.state.buttonStates.map((buttonState, i) => (i === index ? 'KNOWN_CORRECT' : buttonState)),
  //     })
  // }

  updateIncorrect(incorrectAnswers) {
    this.setState({
      buttonStates: this.state.buttonStates.map((option, i) =>
        incorrectAnswers.includes(this.state.options[i]) ? 'KNOWN_INCORRECT' : option
      ),
    })
  }

  componentDidMount() {
    this.setState({
      roomStreamSubscription: inboxStream.subscribe((event) => {
        if (event.type === 'ROUND/START') this.resetGame()
        if (event.type === 'ROUND/OPTIONS') this.setState({ options: event.payload })
        if (event.type === 'ROUND/TIP') this.updateIncorrect(event.payload)
        if (event.type === 'ROUND/UPDATE')
          this.setState({
            options: event.payload.options,
          })
        if (event.type === 'ROUND/SOLUTION') this.updateWithSolution(event.payload)
        if (event.type === 'ROUND/SOLUTION/FINAL') this.updateWithFinalSolution(event.payload)
        // if (event.type === 'GAME/RESULTS') this.updateWithResults(event.payload)
      }),
    })
  }

  componentWillUnmount() {
    this.state.roomStreamSubscription.unsubscribe()
  }

  render() {
    return (
      <S.OptionsGrid item xs={12} container spacing={2} options={this.state.options}>
        {this.state.options
          ? this.state.options.map((option, i) => (
              <Grid key={option} item xs={6}>
                <S.OptionButton
                  color={buttonStateColors[this.state.buttonStates[i]] || 'primary'}
                  variant={buttonStateVariants[this.state.buttonStates[i]] || 'contained'}
                  onMouseDown={() =>
                    outboxStream.next({
                      type: 'ROUND/ANSWER',
                      payload: option,
                      meta: { roomId: this.props.roomId },
                    })
                  }
                >
                  {option}
                </S.OptionButton>
              </Grid>
            ))
          : null}
      </S.OptionsGrid>
    )
  }
}

export default Options
