import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css';
import 'rsuite/lib/styles/index.less'; // or 'rsuite/dist/styles/rsuite-default.css'
import './assets/tailwindcss.css'
import "bulma/css/bulma.css"
import "./assets/input.css"
import "./assets/bacot.css"
import './assets/knd-card.css'
import "flexboxgrid/dist/flexboxgrid.min.css"
import configureStore, { history } from './configureStore'
import Routes from './routes'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)