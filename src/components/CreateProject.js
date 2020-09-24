import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default function CreateProject({projects, setProjects}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [github, setGithub] = useState('')
    const [projectCreated, setProjectCreated] =useState(false)

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }
    
    const handleGithub = (e) => {
        setGithub(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let newProject = {
            title: title,
            description: description,
            github: github
        }
        axios.post(`${process.env.REACT_APP_API}/projects`, newProject)
        .then(response => {
            if (response.status === 200) { 
                setProjectCreated(true)
                setProjects([...projects, response.data])
            }
        })
        .catch(err => console.log(err))
    }

    if (projectCreated) {
        return <Redirect to={`/profile`} />
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' name='title' placeholder='Title' onChange={handleTitle} required />
            <input type='text' name='description' placeholder='Description' onChange={handleDescription} />
            <input type='text' name='github' placeholder='Github URL' onChange={handleGithub} />
            <input type='submit' />
        </form>
    )
}