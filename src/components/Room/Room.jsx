import { inboxStream, outboxStream } from '@logic/socket.js'
import { Grid, Slide, Typography } from '@mui/material'
import React, { Component } from 'react'
import { TransitionGroup } from 'react-transition-group'
import { filter } from 'rxjs/operators'

import Options from './Options'
import * as S from './styled'

const defaultState = { question: '', cards: [] }

class Room extends Component {
  constructor(...args) {
    super(...args)
    this.state = { ...defaultState }
  }

  resetGame() {
    //TODO: check why cards must be kept
    this.setState({ ...defaultState, cards: this.state.cards })
  }

  componentDidMount() {
    this.setState({
      roomStreamSubscription: inboxStream.subscribe((event) => {
        if (event.type === 'ROUND/START') this.resetGame()
        if (event.type === 'ROUND/QUESTION') this.setState({ question: event.payload })
        if (event.type === 'GAME/CARDS') this.setState({ cards: event.payload })
        if (event.type === 'ROUND/UPDATE')
          this.setState({
            question: event.payload.question,
            cards: event.payload.cards,
          })
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
          <Slide key={question} direction={'up'} timeout={500}>
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
                <Options roomId={this.props.roomId} />
              </S.RoomGrid>
            </S.QuestionCardLayer>
          </Slide>
        ))}
      </TransitionGroup>
    )
  }
}

export default Room
