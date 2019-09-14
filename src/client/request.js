import axios from 'axios'
import config from '../config'

const instance = axios.create({
  baseURL: '/',
  params: {
    sercet: config.secret
  }
})

export default instance
