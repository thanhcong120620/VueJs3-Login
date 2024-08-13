import axios from 'axios'

const API_URL = 'http://localhost:8080/api/auth/'

class AuthService {
  // login(user) {
  //   return axios
  //     .post(API_URL + 'signin', {
  //       username: user.username,
  //       password: user.password
  //     })
  //     .then((response) => {
  //       if (response.data.accessToken) {
  //         localStorage.setItem('user', JSON.stringify(response.data))
  //       }

  //       return response.data
  //     })
  // }

  async login(user) {
    try {
      const response = await axios.post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })

      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }

      return response.data
    } catch (error) {
      console.error('Login error:', error)
      throw error // re-throw the error so it can be handled by the caller
    }
  }

  logout() {
    localStorage.removeItem('user')
  }

  // register(user) {
  //   return axios.post(API_URL + 'signup', {
  //     username: user.username,
  //     email: user.email,
  //     password: user.password
  //   })
  // }

  async register(user) {
    try {
      const response = await axios.post(API_URL + 'signup', {
        username: user.username,
        email: user.email,
        password: user.password
      })

      return response.data
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }
}

export default new AuthService()
