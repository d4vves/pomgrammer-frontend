import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Project() {
    let { id } = useParams()
    const [currentProject, setCurrentProject] = useState('')

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/projects/${id}`)
        .then(response => {
            if (response.status === 200) {
                setCurrentProject(response.data)
            }
        })
        .catch(err => console.log(err))
    }, [id])

    return (
        <div>
            <h1>{currentProject.title}</h1>
            <p>{currentProject.description}</p>
        </div>
    )
}