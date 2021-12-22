import 'react-perfect-scrollbar/dist/css/styles.css'

import styled from '@emotion/styled'

import splashImage from '../../assets/bg-2.png'

export const globalStyles = `
  body,
  html,
  #root {
    font-size: 16px;
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    font-family: Roboto;
  }

  #root {
    background-image: url(${splashImage});
    background-size: cover;
    background-position: center;
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
