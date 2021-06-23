import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'

import { theme } from '_utils/material-ui'

import './bootstrap'
import configureStore from './store/configure-store'
import Router from './router'

const root = () => {
  const initialState = {}
  const store = configureStore(initialState)

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </Provider>,
    document.getElementById('root')
  )
}

root()
