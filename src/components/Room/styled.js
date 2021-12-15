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
  width: calc(100vw - 32px);
  max-width: 600px;
`

export const QuestionCardContent = styled(CardContent)`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const QuestionCardOptions = styled(CardContent)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & > .MuiButton-root {
    width: calc(50% - 8px);
    height: 64px;
    line-height: 1.2;
  }
  & > .MuiButton-root:nth-of-type(3),
  & > .MuiButton-root:nth-of-type(4) {
    margin-top: 16px;
  }
`
