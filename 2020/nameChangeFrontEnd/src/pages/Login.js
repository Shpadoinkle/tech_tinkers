import {inject, observer} from 'mobx-react'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {Button, Form, Grid, Segment} from 'semantic-ui-react'
import Padder from '../components/Padder'
import {login} from '../graphql/mutations'
import authStore from '../store/auth'
import {parseErrorMessage} from '../utils/helpers'

@inject('authStore')
@observer
class Login extends Component {
  state = {
    submitting: false,
    email: '',
    password: '',
  }

  handleLogin = async () => {
    const {email, password, submitting} = this.state
    const history = this.props.history
    if (submitting) return
    if (!email || !password) {
      return toast.warning('Please provide an email and password')
    }
    this.setState({submitting: true})

    try {
      const result = await login({
        email: this.state.email,
        password: this.state.password,
      })
      authStore.setToken(result.data.passwordLogin)
      toast.success('Successfully logged in!')
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
    const {submitting, email, password} = this.state

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
                  Login
                </Button>
                <Padder />
                <Link to={`/signup`}>Go to Sign up</Link>

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

export default Login
