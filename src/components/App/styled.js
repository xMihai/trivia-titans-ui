import 'react-perfect-scrollbar/dist/css/styles.css'

// import icomoon from '@components/Icon/icomoon.ttf'
import { createMuiTheme } from '@material-ui/core/styles'
import styled, { createGlobalStyle } from 'styled-components'

// import fonts from './fonts'

export const theme = createMuiTheme({
  palette: {
    primary: { main: '#4C3366', dark: '#352347', light: '#6F5B84' },
    secondary: { main: '#FF4E50', dark: '#B23638', light: '#FF7173' },
  },
  typography: {
    fontFamily: 'Open Sans',
    fontSize: 16,
  },
})

export const GlobalStyle = createGlobalStyle`
  body,
  html,
  #root {
    font-size: 16px;
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    background-color: #EEEEEE;
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
