import {inject, observer} from 'mobx-react'
import React, {Component} from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'semantic-ui-css/semantic.min.css'
import {Dimmer, Loader} from 'semantic-ui-react'
import './App.scss'
import Private from './components/Private'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UpcomingNames from './pages/UpcomingNames'
import User from './pages/User'

/**
 *  Main App
 */
@inject('authStore')
@observer
class App extends Component {
  render() {
    const {authStore} = this.props
    if (!authStore.hydrated) {
      return (
        <Dimmer active>
          <Loader active />
        </Dimmer>
      )
    }
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/upcoming" component={UpcomingNames} />
          <Route
            render={() => (
              <Private>
                {/* <Route exact path="/me" component={User} /> */}
                <Route exact path="/names" component={UpcomingNames} />
                <Route exact path="/" component={User} />
              </Private>
            )}
          />
        </Switch>

        <ToastContainer newestOnTop={true} position="top-right" />
      </div>
    )
  }
}

export default withRouter(App)
