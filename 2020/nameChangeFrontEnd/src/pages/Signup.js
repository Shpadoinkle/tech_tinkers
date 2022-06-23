import {inject, observer} from 'mobx-react'
import React, {Component} from 'react'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import {Button, Form, Grid, Image, Segment} from 'semantic-ui-react'
import {signup} from '../graphql/mutations'
import authStore from '../store/auth'
import {parseErrorMessage} from '../utils/helpers'
import Padder from '../components/Padder'

@inject('authStore')
@observer
class Signup extends Component {
  state = {
    submitting: false,
    email: '',
    password: '',
    name: '',
  }

  handleLogin = async () => {
    console.log(this.props)
    const {email, password, submitting, name} = this.state
    const history = this.props.history

    if (submitting) return
    if (!email || !name || !password) {
      return toast.warning('Please provide all details')
    }
    this.setState({submitting: true})

    try {
      const result = await signup({
        email,
        password,
        name,
      })

      authStore.setToken(result.data.signup)
      toast.success('Welcome!')

      history.push('/')
    } catch (err) {
      console.log('err', err)
      toast.error(parseErrorMessage(err))
      this.setState({submitting: false})
    }
  }

  handleChange = (key, e) => {
    this.setState({[key]: e.target.value})
  }

  render() {
    const {submitting, email, password, name} = this.state

    return (
      <div>
        <Grid
          textAlign="center"
          style={{height: '100vh'}}
          verticalAlign="middle"
        >
          <Grid.Column style={{maxWidth: 450}}>
            <Form size="large" loading={submitting}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Name"
                  value={name}
                  onChange={this.handleChange.bind(null, 'name')}
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  value={email}
                  onChange={this.handleChange.bind(null, 'email')}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={this.handleChange.bind(null, 'password')}
                />

                <Button
                  style={{backgroundColor: '#4258A7', color: 'white'}}
                  fluid
                  size="large"
                  onClick={this.handleLogin}
                  type="submit"
                >
                  Create Account
                </Button>
                <Padder />
                <Link to={`/login`}>Go to login</Link>

                <Padder />
                <div>or</div>
                <Padder />
                <Link to={`/upcoming`}>Check upcoming available names</Link>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Signup
