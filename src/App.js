import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import setAuthToken from './utils/setAuthToken'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import Home from './components/Home'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Project from './components/Project'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem('jwtToken')
  return <Route {...rest} render={(props) => (
    user ? <Component {...rest} {...props} /> : <Redirect to='/login' />
  )}
  />
}

export default function App() {
  const [currentUser, setCurrentUser] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    let token
    if (localStorage.getItem('jwtToken') === null) {
      setIsAuthenticated(false)
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'))
      setAuthToken(localStorage.jwtToken)
      setCurrentUser(token)
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      axios.get(`${process.env.REACT_APP_API}/projects`)
      .then(response => {
        setProjects(response.data)
      })
      .catch(err => console.log(err))
    }
  }, [isAuthenticated])

  let nowCurrentUser = (userData) => {
    setCurrentUser(userData)
    setIsAuthenticated(true)
  }

  let handleLogout = () => {
    if (localStorage.getItem('jwtToken') !== null) {
      localStorage.removeItem('jwtToken')
      setCurrentUser(null)
      setIsAuthenticated(false)
    }
  }
  
  return (
    <>
      <Header />
      <main>
        <Sidebar currentUser={currentUser} handleLogout={handleLogout} isAuthenticated={isAuthenticated} projects={projects} />
        <Switch>
          <Route path='/register' component={ Register } />
          <Route path='/login' render={ (props) => <Login {...props} nowCurrentUser={nowCurrentUser} user={currentUser} /> } />
          <PrivateRoute path='/profile' component={ Profile } user={currentUser} />
          <Route path='/project/:id' component={ Project }/>
          <Route path = '/' component={ Home } />
        </Switch>
      </main>
    </>
  )
}