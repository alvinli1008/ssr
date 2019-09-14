import axios from 'axios'
import config from '../config'

const createInstance = (req) => axios.create({
    // http://118.89.94.14:3001/admin
    baseURL: 'http://localhost:3030/ssr',
    headers: {
        cookie: req.get('cookie') || '',
    },
    params: {
        secret: config.secret
      },
})

export default createInstance