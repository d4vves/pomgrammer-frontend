import React from 'react'
import { Link } from 'react-router-dom'

export default function SidebarProject({_id, title}) {
    return (
        <Link to={`/project/${_id}`}><h3>{title}</h3></Link>
    )
}