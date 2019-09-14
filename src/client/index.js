import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import { getClientStore } from '../store'
import routes from '../Routes'

const APP = () => {
  const store = getClientStore()

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
        {renderRoutes(routes)}
        </div>
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.hydrate(<APP />, document.getElementById('app'))
