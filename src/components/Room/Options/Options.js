import { defaultOptionState, roundOptionsObs } from '@logic/room'
import { Grid } from '@mui/material'
import React, { PureComponent } from 'react'

import OptionButton from './OptionButton'
import * as S from './styled'

const defaultState = { options: new Array(4).fill(defaultOptionState) }

class Options extends PureComponent {
  constructor(...args) {
    super(...args)
    this.state = { ...defaultState }
  }

  componentDidMount() {
    this.setState({
      roundOptionsSubscription: roundOptionsObs.subscribe((options) => this.setState({ options })),
    })
  }

  componentWillUnmount() {
    this.state.roundOptionsSubscription.unsubscribe()
  }

  render() {
    console.log(111, this.state.options)
    return (
      <S.OptionsGrid item xs={12} container spacing={2} options={this.state.options}>
        {this.state.options.map((option, index) => (
          <Grid key={`${index}`} item xs={6}>
            <OptionButton
              {...{
                roomId: this.props.roomId,
                option,
                index,
              }}
            />
          </Grid>
        ))}
      </S.OptionsGrid>
    )
  }
}

export default Options
