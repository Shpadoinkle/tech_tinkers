import React, {Component} from 'react'
import {Redirect, Link, withRouter} from 'react-router-dom'
import gql from 'graphql-tag'
import {Query, graphql} from 'react-apollo'
import {compose} from 'recompose'
import {GET_NAMES} from '../graphql/queries'

import {
  Icon,
  Label,
  Header,
  Menu,
  Table,
  Button,
  Pagination,
  Segment,
  Breadcrumb,
  Container,
  Input,
  Loader,
} from 'semantic-ui-react'
import moment from 'moment'

class Users extends Component {
  state = {
    skip: 0,
    take: 15,
    search: '',
    page: 1,
    column: 'orders',
    direction: 'descending',
  }
  handleView = (id) => {
    const {history} = this.props
    history.push(`/users/${id}`)
  }

  handleEdit = (id) => {
    const {history} = this.props
    history.push(`/users/${id}/edit`)
  }

  handlePaginationChange = (e, {activePage}) => {
    this.setState({page: activePage})
  }

  handleChangeSearch = (e) => {
    this.setState({search: e.target.value})
  }

  handleSort = (clickedColumn) => () => {
    const {column, data, direction} = this.state
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        direction: 'ascending',
      })
      return
    }
    this.setState({
      // data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
      column: direction === 'descending' ? '' : clickedColumn,
    })
  }

  getDirection = (direction) => {
    return direction === 'descending' ? 'DESC' : 'ASC'
  }

  renderUsers = () => {
    return (
      <Query query={GET_NAMES} fetchPolicy="network-only">
        {({loading, error, data, fetchMore, refetch, networkStatus}) => {
          if (!data || loading)
            return (
              <Table.Row>
                <Table.Cell>
                  <Loader active></Loader>
                </Table.Cell>
              </Table.Row>
            )
          if (error)
            return (
              <Table.Row>
                <Table.Cell>
                  <div>Something went wrong</div>
                </Table.Cell>
              </Table.Row>
            )
          const names = data.upcomingNames || []
          console.log('--------- NAMES -------------')
          console.log(names)
          return names.length
            ? names.map(({id, string, expiresAt}) => {
                return (
                  <Table.Row
                    key={id}
                    className="hover"
                    onClick={this.handleView.bind(null, id)}
                  >
                    <Table.Cell className="userName">{string}</Table.Cell>
                    <Table.Cell>
                      {moment.utc(expiresAt).format('DD/MM/YYYY')}
                    </Table.Cell>
                  </Table.Row>
                )
              })
            : null
        }}
      </Query>
    )
  }

  render() {
    return (
      <>
        <Header as="h1">Soon To Be Available Names</Header>
        <Segment basic>
          <Table celled sortable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                //   sorted={column === 'id' ? direction : null}
                //   onClick={this.handleSort('id')}
                >
                  Name
                </Table.HeaderCell>
                <Table.HeaderCell>Expiry Date</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{this.renderUsers()}</Table.Body>
          </Table>
        </Segment>
      </>
    )
  }
}

export default Users
