const express = require('express')
const cookieParase = require('cookie-parser')

const app = express()

app.use(cookieParase())

app.use(require('cors')())
app.use(express.json())
app.use(express.static('public'))

app.use('/ssr/api/login.json', (req, res) => {
  res.cookie('login', true, {signed: false, maxAge: 30 * 60000})
  res.send({
    success: true,
    data: {
      login: true
    }
  })
})

app.use('/ssr/api/logout.json', (req, res) => {
  res.clearCookie('login')
  res.send({
    success: true,
    data: {
      logout: true
    }
  })
})

app.use('/ssr/api/isLogin.json', (req, res) => {
  console.log(req.cookies.login)
  res.send({
    success: true,
    data: {
      login: !!req.cookies.login
    }
  })
})

app.use('/ssr/api/translations.json', (req, res) => {
  if (!!req.cookies.login) {
    res.send({
      success: true,
      data: translations
    })
  } else {
    res.send({
      success: false
    })
  }
})

app.use('/ssr/api/news.json', (req, res) => {
    res.send(news)
  })

app.listen(3030, () => {
  console.log('3030')
})

const news = [
  {
    id: 1,
    title: 'express 怎么给所有要 render 的页面赋值一个变量? '
  },
  {
    id: 2,
    title: '在Express的页面模板中的变量的定义与使用总结'
  },
  {
    id: 3,
    title: 'nodejs项目如何组织公共常量 - V2EX'
  },
  {
    id: 4,
    title: 'js 更新变量 - 云+社区 - 腾讯云'
  },
  {
    id: 5,
    title: 'express-nodejs变量是怎么回事?——CSDN问答频道'
  }
]


const translations = [
  {
    id: 1,
    title: 'How does express assign a variable to all pages that want render?'
  },
  {
    id: 2,
    title: 'Definition and Use Summary of Variables in Express Page Template'
  },
  {
    id: 3,
    title: 'How to organize common constants for nodejs Projects - V2EX'
  },
  {
    id: 4,
    title: 'JS update variable - cloud + community - Tencent cloud'
  },
  {
    id: 5,
    title: 'What is the express-node JS variable? - CSDN Question and Answer Channel'
  }
]