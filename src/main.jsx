import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import firebase from 'firebase/compat/app'
import { Provider } from 'react-redux'
import { store } from './Redux/store.js'
import firebaseConfig from './firbase/firebaseconfig.js'


firebase.initializeApp(firebaseConfig)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="379356039252-v9gd7i7ldgua7c9bgn719h0qur9bs5md.apps.googleusercontent.com">
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>;
    </BrowserRouter>

  </React.StrictMode>,
)
