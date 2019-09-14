import express from 'express'
import proxy from 'express-http-proxy'
import { render } from './utils'
import { matchRoutes } from 'react-router-config'
import { getStore } from '../store'
import routes from '../Routes'

const app = express()
app.use(express.static('public'))

//http://118.89.94.14:3001
app.use(
  '/api',
  proxy('http://localhost:3030', {
    proxyReqPathResolver: function(req) {
      // console.log(req.url)
      return '/ssr/api' + req.url
    }
  })
)

app.get('*', (req, res) => {
  const store = getStore(req)
  // 根据路由的路径，来往store里面加数据
  const matchedRoutes = matchRoutes(routes, req.path)
  // 让matchRoutes里面所有的组件，对应的loadData方法执行一次
  const promises = []
  matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      // 这儿处理 是解决 如果有一个页面出错 页面还是会渲染可以获取的数据 获取不了的不显示
      const promise = new Promise((resolve, reject) => {
        item.route.loadData(store).then(resolve).catch(resolve)
      })
      promises.push(promise)
    }
  })

  Promise.all(promises).then(() => {
    const context = {
      css: []
    }
    const html = render(store, routes, req, context)
    // console.log(context.css)
    if (context.action === 'REPLACE') {
      res.redirect(301, context.url) // 服务端的重定向
    } else if (context.NOT_FOUND) {
      res.status(404)
      res.send(html)
    } else {
      res.send(html)
    }
  })
})

var server = app.listen(3000, () => {
  console.log('Listening on port 3000')
})
