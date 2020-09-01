import React from 'react'
import { Link } from 'react-router-dom'
import PomLogo from './svg/PomLogo'
import '../App.css'

export default function Header() {
    return (
        <section className='header'>
            <PomLogo />
            <Link to='/'><h1>pomgrammer</h1></Link>
        </section>
    )
}