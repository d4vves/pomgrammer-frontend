import React, { useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import axios from 'axios'
import Timer from './Timer'

export default function Project({projects, setProjects}) {
    let { id } = useParams()
    const [currentProject, setCurrentProject] = useState('')
    const [projectDeleted, setProjectDeleted] = useState(false)
    const [showPoms, setShowPoms] = useState(true)
    let pomList

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/projects/${id}`)
        .then(response => {
            if (response.status === 200) {
                setCurrentProject(response.data)
            }
        })
        .catch(err => console.log(err))
    }, [id, showPoms])

    const deleteProject = () => {
        axios.delete(`${process.env.REACT_APP_API}/projects/${id}`)
        .then(response => {
            if (response.status === 200) {
                let newProjects = projects.filter(project => project._id !== currentProject._id)
                setProjects(newProjects)
                setProjectDeleted(true)
            }
        })
        .catch(err => console.log(err))
    }

    if (currentProject) {
        pomList = currentProject.poms.length < 1 ?
            <p>No Poms</p>
        :
            currentProject.poms.map((pom, i) => {
                return <p key={i}>{pom.date} - {pom.focus}</p>
            })
    }

    if (projectDeleted) {
        return <Redirect to={`/profile`} />
    }

    const toggleAdd = () => {
        setShowPoms(false)
    }

    return (
        <div>
            {showPoms ?
                <div>
                    <h1>{currentProject.title}</h1>
                    <button onClick={deleteProject}>Delete</button>
                    <p>{currentProject.description}</p>
                    <button onClick={toggleAdd}>Add Pom</button>
                    {pomList}
                </div>
            :
                <Timer id={id} setShowPoms={setShowPoms} currentProject={currentProject} />
            }
        </div>
    )
}