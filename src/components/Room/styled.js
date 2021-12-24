import styled from '@emotion/styled'
import { Card, CardContent, Grid } from '@mui/material'

export const Room = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
export const RoomGrid = styled(Grid)`
  width: calc(100vw - 32px);
  max-width: 600px;
`

export const QuestionCardLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const QuestionCard = styled(Card)``

export const QuestionCardContent = styled(CardContent)`
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const QuestionCardCards = styled(CardContent)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export const OptionsGrid = styled(Grid)`
  ${({ options }) => (options ? null : 'visibility: hidden;')}
  height: 176px;
`
