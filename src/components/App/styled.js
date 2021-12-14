import 'react-perfect-scrollbar/dist/css/styles.css'

import styled from '@emotion/styled'

export const globalStyles = `
  body,
  html,
  #root {
    font-size: 16px;
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    background-color: #EEEEEE;
    font-family: Roboto;
  }
`

export const Wrapper = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`
