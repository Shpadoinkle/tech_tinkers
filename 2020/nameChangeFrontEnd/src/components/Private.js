import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {Container, Sidebar, Segment, Dimmer, Loader} from 'semantic-ui-react'
import Navbar from '../components/Navbar'
import Leftbar from '../components/Leftbar'
import authStore from '../store/auth'
import {observer} from 'mobx-react'

@observer
class Private extends Component {
  render() {
    const {children} = this.props
    return (
      <>
        <Navbar />
        <Sidebar.Pushable as={Segment}>
          <Leftbar />
          <Sidebar.Pusher>
            <Container fluid>
              {authStore.isLoggedIn ? children : <Redirect to="/login" />}
            </Container>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </>
    )
  }
}
export default Private
