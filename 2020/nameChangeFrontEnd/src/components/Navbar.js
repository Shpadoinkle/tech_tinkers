import React from 'react'
import {useHistory} from 'react-router-dom'
import {Menu} from 'semantic-ui-react'
import authStore from '../store/auth'

export default function Navbar() {
  let history = useHistory()

  function handleLogout() {
    // const {userStore, history} = this.props
    authStore.logout()
    history.push('/login')
  }

  return (
    <Menu className={'Navbar'}>
      <Menu.Item></Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item as="div"></Menu.Item>
        <Menu.Item
          as="div"
          name="logout"
          onClick={handleLogout}
          style={{color: 'white'}}
        />
      </Menu.Menu>
    </Menu>
  )
}
