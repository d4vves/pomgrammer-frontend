import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default function Project() {
    let { id } = useParams()
    const [currentProject, setCurrentProject] = useState('')
    const [projectDeleted, setProjectDeleted] = useState(false)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/projects/${id}`)
        .then(response => {
            if (response.status === 200) {
                setCurrentProject(response.data)
            }
        })
        .catch(err => console.log(err))
    }, [id])

    const deleteProject = () => {
        axios.delete(`${process.env.REACT_APP_API}/projects/${id}`)
        .then(response => {
            if (response.status === 200) {
                setProjectDeleted(true)
            }
        })
    }

    if (projectDeleted) {
        return <Redirect to={`/profile`} />
    }

    return (
        <div>
            <h1>{currentProject.title}</h1>
            <button onClick={deleteProject}>Delete</button>
            <p>{currentProject.description}</p>
        </div>
    )
}