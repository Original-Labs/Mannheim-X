import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import App from 'App'
import 'globalStyles'
import './i18n'
import setup from './setup'
import { clientReactive, networkIdReactive } from './apollo/reactiveVars'
import { setupClient } from './apollo/apolloClient'
import Loader from './components/Loader'
import 'App.css'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from 'Store/index.js'

setup(false)
window.addEventListener('load', async () => {
  const client = clientReactive(setupClient(networkIdReactive()))
  ReactDOM.render(
    <Suspense fallback={<Loader withWrap large />}>
      <ApolloProvider {...{ client }}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </ApolloProvider>
    </Suspense>,
    document.getElementById('root')
  )
})
