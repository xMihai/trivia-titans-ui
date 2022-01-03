import { roundQuestionObs } from '@logic/room'
import { Grid, Slide, Typography } from '@mui/material'
import React, { Component } from 'react'
import { TransitionGroup } from 'react-transition-group'

import Options from './Options'
import * as S from './styled'

const defaultState = { question: '' }

class Room extends Component {
  constructor(...args) {
    super(...args)
    this.state = { ...defaultState }
  }

  componentDidMount() {
    this.setState({
      roundQuestionSubscription: roundQuestionObs.subscribe((question) => {
        if (this.state.question !== question) this.setState({ question })
      }),
    })
  }

  componentWillUnmount() {
    this.state.roundQuestionSubscription.unsubscribe()
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
