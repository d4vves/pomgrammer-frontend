import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default function Register() {
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [password2, setPassword2] = useState('')
    let [redirect, setRedirect] = useState(false)

    let handleName = (e) => {
      setName(e.target.value)
    }

    let handleEmail = (e) => {
      setEmail(e.target.value)
    }

    let handlePassword = (e) => {
      setPassword(e.target.value)
    }

    let handlePassword2 = (e) => {
      setPassword2(e.target.value)
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        if (password === password2) {
          const newUser = {
            name: name,
            email: email,
            password: password
          }
          axios.post(`${process.env.REACT_APP_API}/register`, newUser)
          .then(response => {
              setRedirect(true)
          })
          .catch(err => {
              console.log(err)
          })
        }
    }

    if (redirect) return <Redirect to='/login' />

    return (
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' value={name} onChange={handleName} />

                <label htmlFor='email'>Email</label>
                <input type='email' name='email' value={email} onChange={handleEmail} />

                <label htmlFor='password'>Password</label>
                <input type='password' name='password' value={password} onChange={handlePassword} />

                <label htmlFor='password2'>Confirm Password</label>
                <input type='password' name='password2' value={password2} onChange={handlePassword2} />

                <input type='submit' />
            </form>
    )
  }