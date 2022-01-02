import styled from '@emotion/styled'
import { Button, Grid } from '@mui/material'

export const OptionsGrid = styled(Grid)`
  ${({ options }) => (options ? null : 'visibility: hidden;')}
  height: 176px;
`

const bgColors = {
  primary: 'rgba(127, 222, 255, 0.5)',
  success: 'rgba(0, 255, 180, 0.5)',
  error: 'rgba(255, 180, 180, 0.5)',
}
const colors = {
  primary: 'rgba(127, 222, 255, 1)',
  success: 'rgba(0, 255, 180, 1)',
  error: 'rgba(255, 180, 180, 1)',
}

const getContainedBaseCss = (color) => `
  background-color: ${bgColors[color]};
  &:nth-of-type(odd) {
    box-shadow: 0 0 0 2px ${colors[color]} inset, 4px 0 0 0 ${colors[color]} inset;
  }
  &:nth-of-type(even) {
    box-shadow: 0 0 0 2px ${colors[color]} inset, -4px 0 0 0 ${colors[color]} inset;
  }
`

const getContainedCss = (color) => `
  ${getContainedBaseCss(color)}
  &:hover {
    ${getContainedBaseCss(color)}
  }
`

const optionButtonStyles = ({ color, variant }) => {
  if (variant === 'contained' && bgColors[color]) return getContainedCss(color)
  if (variant === 'outlined' && bgColors[color])
    return `
  background-color: transparent;
  box-shadow: 0 0 0 2px ${colors[color]} inset;
  color: ${colors[color]};
  border: none;

  &:hover {
    background-color: transparent;
    box-shadow: 0 0 0 2px ${colors[color]} inset;
    color: ${colors[color]};
    border: none;
  }
`
}

const optionButtonEffects = ({ transitionstate, index }) => {
  switch (transitionstate) {
    case 'exited':
      return `
        opacity: 0;
        transform: scale(0.9);
      `
    case 'entering':
      return `
        transition: opacity 300ms ease-in ${index * 50}ms, transform 250ms ease-in ${index * 50}ms;
      `
  }
}

export const OptionButton = styled(Button)`
  width: 100%;
  height: 64px;
  ${optionButtonStyles}
  ${optionButtonEffects}
`
