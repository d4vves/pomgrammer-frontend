import React, { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom'
import setAuthToken from '../utils/setAuthToken'

export default function Login(props) {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    let handleEmail = (e) => {
        setEmail(e.target.value)
    }

    let handlePassword = (e) => {
        setPassword(e.target.value)
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email: email,
            password: password
        }
        axios.post(`${process.env.REACT_APP_API}/login`, userData)
        .then(response => {
            const { token } = response.data
            localStorage.setItem('jwtToken', token)
            setAuthToken(token)
            const decoded = jwt_decode(token)
            props.nowCurrentUser(decoded)
        })
        .catch(err => console.log(err))
    }

    if (props.user) return <Redirect to="/profile" user={props.user} />

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' value={email} onChange={handleEmail} required />

            <label htmlFor='password'>Password</label>
            <input type='password' name='password' value={password} onChange={handlePassword} required />

            <input type='submit' />
        </form>
    )
}