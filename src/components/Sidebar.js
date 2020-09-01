import React from 'react'
import { Link } from 'react-router-dom'
import SidebarProject from './SidebarProject'
import '../App.css'

export default function Sidebar({ currentUser, handleLogout, isAuthenticated, projects }) {
    let projectList = projects.length < 1 ?
        <h3>No current projects.</h3>
    :
        projects.map((project, i) => (
            <SidebarProject key={i} {...project}/>
        ))

    return (
        <section className='sidebar'>
            {
                !isAuthenticated ?
                    <p>
                        <Link to='/register'>Register</Link> or <Link to='/login'>Login</Link>
                    </p>
                :
                    <>
                        <h2>
                            <Link to='profile'>{currentUser.name}</Link>
                        </h2>
                        <button onClick={handleLogout}>Logout</button>
                        {projectList}
                    </>
            }
        </section>
    )
}