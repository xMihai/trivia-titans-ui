import styled from '@emotion/styled'
import { Card, CardContent } from '@mui/material'

export const Room = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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

export const QuestionCard = styled(Card)`
  width: calc(100vw - 32px);
  max-width: 600px;
`

export const QuestionCardContent = styled(CardContent)`
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
    min-height: 64px;
    line-height: 1.2;
  }
  & > .MuiButton-root:nth-of-type(3),
  & > .MuiButton-root:nth-of-type(4) {
    margin-top: 16px;
  }
`

export const QuestionCardCards = styled(CardContent)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
