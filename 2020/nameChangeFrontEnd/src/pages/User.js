import moment from 'moment'
import React, {Component} from 'react'
import {Query} from 'react-apollo'
import {toast} from 'react-toastify'
import {
  Button,
  Card,
  Form,
  Grid,
  Header,
  List,
  Loader,
  Segment,
} from 'semantic-ui-react'
import Padder from '../components/Padder'
import {GET_ME} from '../graphql/queries'
import {changeName} from '../graphql/mutations'
import {parseErrorMessage} from '../utils/helpers'

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      submitting: false,
    }
  }

  handleSaveName = async (currentName) => {
    const {name, submitting} = this.state

    if (!name || submitting || currentName.toLowerCase() === name.toLowerCase())
      return

    console.log(name, currentName)
    this.setState({submitting: true})
    try {
      const result = await changeName(name)
      toast.success('Name change successful!')
    } catch (err) {
      console.log('err', err)
      toast.error(parseErrorMessage(err))
    } finally {
      this.setState({submitting: false})
    }
  }

  handleChange = (key, e) => {
    this.setState({[key]: e.target.value})
  }

  renderContent = ({loading, error, data}) => {
    const {name, submitting} = this.state
    if (!data && loading) return <Loader active></Loader>
    if (error) return <div>Something wrong happened</div>
    if (!data.me) return <div>Error loading profile</div>
    const {me} = data
    const {currentName, pastNames} = me

    return (
      <div style={{maxWidth: 1200}}>
        <Header as="h1">Profile</Header>
        <Segment basic>
          <Grid>
            {/* LEFT */}
            <Grid.Column width={8}>
              <div>
                <Card fluid>
                  {/* <Image src="/square-image.png" wrapped ui={false} /> */}
                  <Card.Content>
                    <Card.Header className="userName">
                      {currentName.string}
                    </Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <Card.Content>
                      <Form size="large" loading={submitting}>
                        <Form.Input
                          fluid
                          icon="user"
                          iconPosition="left"
                          placeholder="New Name"
                          value={name}
                          onChange={this.handleChange.bind(null, 'name')}
                        />
                        <Button
                          style={{backgroundColor: '#4258A7', color: 'white'}}
                          fluid
                          size="large"
                          onClick={this.handleSaveName.bind(
                            null,
                            currentName.string
                          )}
                          type="submit"
                        >
                          Change name
                        </Button>
                      </Form>
                    </Card.Content>
                  </Card.Content>
                </Card>
              </div>
            </Grid.Column>
            {/* RIGHT */}
            <Grid.Column width={8}>
              <div>
                <Card fluid>
                  <Card.Content style={{display: 'flex', alignItems: 'center'}}>
                    <Card.Header
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <p>Previous Names</p>
                      </div>
                    </Card.Header>
                  </Card.Content>
                  <Card.Content textAlign="left">
                    <List>
                      {pastNames.map((e) => (
                        <List.Item key={e.id}>
                          {/* <List.Icon name="users" /> */}
                          <List.Content>
                            {/* {moment.utc(e.revokedAt).format('DD/MM/YYYY')} */}
                            <Grid>
                              <Grid.Column width={4} className="userName">
                                {e.string}
                              </Grid.Column>
                              <Grid.Column width={8}>
                                Changed on{' '}
                                {moment.utc(e.revokedAt).format('DD/MM/YYYY')}
                              </Grid.Column>
                            </Grid>
                          </List.Content>
                        </List.Item>
                      ))}
                    </List>
                  </Card.Content>
                </Card>
              </div>
              <Padder />
              <div></div>
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    )
  }
  render() {
    return (
      <Query query={GET_ME} fetchPolicy="network-only">
        {this.renderContent}
      </Query>
    )
  }
}

export default User
