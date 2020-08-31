import React from 'react'

export default function Profile({ user }) {
    console.log(user)
    return (
        <h1>Hello, {user.name}</h1>
    )
}