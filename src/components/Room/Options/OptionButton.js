import { outboxStream } from '@logic/socket.js'
import React, { Component } from 'react'
import { Transition } from 'react-transition-group'

import * as S from './styled'

class OptionButton extends Component {
  render() {
    return (
      <Transition in={!!this.props.option.text} timeout={500} appear={true}>
        {(transitionState) => (
          <S.OptionButton
            transitionstate={transitionState}
            index={this.props.index}
            color={this.props.option.correct ? 'success' : this.props.option.correct === false ? 'error' : 'primary'}
            variant={this.props.option.tipped ? 'outlined' : 'contained'}
            onMouseDown={() =>
              outboxStream.next({
                type: 'ROUND/ANSWER',
                payload: this.props.option.text,
                meta: { roomId: this.props.roomId },
              })
            }
          >
            {this.props.option.text}
          </S.OptionButton>
        )}
      </Transition>
    )
  }
}

export default OptionButton
