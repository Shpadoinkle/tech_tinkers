import {observable, computed, action} from 'mobx'
import {create, persist} from 'mobx-persist'
import localForage from 'localforage'

class User {
  @persist
  @observable
  id = ''
}

class AuthStore {
  @observable hydrated = false

  @persist
  @observable
  token = ''

  @persist('object', User)
  @observable
  user

  @computed
  get isLoggedIn() {
    console.log('computed', !!this.token)
    return !!this.token
  }

  @action
  setToken(token) {
    this.token = token
  }

  @action
  setUser(user) {
    this.user = user
  }

  @action
  logout() {
    console.log('Loggin out!')
    this.token = ''
    this.user = null
  }
}

const hydrate = create({
  storage: localForage,
  jsonify: false,
})

// create the state
const authStore = new AuthStore()

hydrate('auth', authStore).then(() => {
  authStore.hydrated = true
})

export default authStore
