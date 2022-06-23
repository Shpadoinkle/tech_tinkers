import React from 'react'
import {Link} from 'react-router-dom'
import {Icon, Menu, Sidebar} from 'semantic-ui-react'

export default function Leftbar() {
  return (
    <Sidebar
      as={Menu}
      animation={'push'}
      direction={'left'}
      icon="labeled"
      inverted
      vertical
      visible={true}
      width="thin"
    >
      <Menu.Item as={Link} to="/">
        <Icon name="tachometer alternate" />
        My Profile
      </Menu.Item>
      <Menu.Item as={Link} to="/names">
        <Icon name="users" />
        Names
      </Menu.Item>
    </Sidebar>
  )
}
