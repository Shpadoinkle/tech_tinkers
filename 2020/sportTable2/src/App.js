import React from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import Home from './pages/Home'
import themeStore from './theme'

function App() {
  return (
    <ThemeProvider theme={themeStore}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
