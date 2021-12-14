import styled from '@emotion/styled'
import { Card, CardActions, CardContent } from '@mui/material'

export const Room = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

export const QuestionCard = styled(Card)`
  position: absolute;
  bottom: 64px;
  margin: 0 auto;
  left: 0;
  right: 0;
  width: 640px;
  height: 300px;
`

export const QuestionCardContent = styled(CardContent)`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`
