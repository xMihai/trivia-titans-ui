import { inboxStream, outboxStream } from '@logic/socket.js'
import { Grid, Slide, Typography } from '@mui/material'
import React, { Component } from 'react'
import { TransitionGroup } from 'react-transition-group'
import { filter } from 'rxjs/operators'

import OptionButton from './OptionButton'
import * as S from './styled'

const defaultState = { question: '', options: null, cards: [], buttonStates: [null, null, null, null] }
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
    this.setState({ ...defaultState, cards: this.state.cards })
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

  updateWithResults(payload) {
    const index = this.state.options.indexOf(payload.correctAnswer)
    if (this.state.buttonStates[index] !== 'CORRECT')
      this.setState({
        buttonStates: this.state.buttonStates.map((buttonState, i) => (i === index ? 'KNOWN_CORRECT' : buttonState)),
      })
  }

  updateIncorrect(incorrectAnswers) {
    this.setState({
      buttonStates: this.state.buttonStates.map((option, i) =>
        incorrectAnswers.includes(this.state.options[i]) ? 'KNOWN_INCORRECT' : option
      ),
    })
  }

  componentDidMount() {
    this.setState({
      roomStreamSubscription: inboxStream.pipe(filter((event) => event.type.startsWith('GAME/'))).subscribe((event) => {
        if (event.type === 'GAME/START') this.resetGame()
        if (event.type === 'GAME/QUESTION') this.setState({ question: event.payload })
        if (event.type === 'GAME/OPTIONS') this.setState({ options: event.payload })
        if (event.type === 'GAME/CARDS') this.setState({ cards: event.payload })
        if (event.type === 'GAME/TIP') this.updateIncorrect(event.payload)
        if (event.type === 'GAME/UPDATE')
          this.setState({
            question: event.payload.question,
            options: event.payload.options,
            cards: event.payload.cards,
          })
        if (event.type === 'GAME/SOLUTION') this.updateWithSolution(event.payload)
        if (event.type === 'GAME/SOLUTION/FINAL') this.updateWithFinalSolution(event.payload)
        if (event.type === 'GAME/RESULTS') this.updateWithResults(event.payload)
      }),
    })
  }

  componentWillUnmount() {
    this.state.roomStreamSubscription.unsubscribe()
  }

  render() {
    return (
      <TransitionGroup component={S.Room} appear={true}>
        {[this.state.question].map((question) => (
          <Slide key={question} direction={'up'}>
            <S.QuestionCardLayer>
              <S.RoomGrid container spacing={2}>
                <Grid item xs={12}>
                  <S.QuestionCard>
                    <S.QuestionCardContent>
                      <Typography variant="h5" align="center">
                        {this.state.question}
                      </Typography>
                    </S.QuestionCardContent>
                    {/* {this.state.cards && this.state.cards.length ? (
                      <S.QuestionCardCards>
                        {this.state.cards.map((card) => (
                          <Button
                            key={card}
                            size="small"
                            color={'primary'}
                            variant={'contained'}
                            onMouseDown={() =>
                              outboxStream.next({
                                type: 'GAME/CARD',
                                payload: card,
                                meta: { roomId: this.props.roomId },
                              })
                            }
                          >
                            {card}
                          </Button>
                        ))}
                      </S.QuestionCardCards>
                    ) : null} */}
                  </S.QuestionCard>
                </Grid>
                <S.OptionsGrid item xs={12} container spacing={2} options={this.state.options}>
                  {this.state.options
                    ? this.state.options.map((option, i) => (
                        <Grid key={option} item xs={6}>
                          <OptionButton
                            color={buttonStateColors[this.state.buttonStates[i]] || 'primary'}
                            variant={buttonStateVariants[this.state.buttonStates[i]] || 'contained'}
                            onMouseDown={() =>
                              outboxStream.next({
                                type: 'GAME/ANSWER',
                                payload: option,
                                meta: { roomId: this.props.roomId },
                              })
                            }
                          >
                            {option}
                          </OptionButton>
                        </Grid>
                      ))
                    : null}
                </S.OptionsGrid>
              </S.RoomGrid>
            </S.QuestionCardLayer>
          </Slide>
        ))}
      </TransitionGroup>
    )
  }
}

export default Room
