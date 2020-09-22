import React, { useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import axios from 'axios'
import Timer from './Timer'
import Pom from './Pom'

export default function Project({projects, setProjects}) {
    let { id } = useParams()
    const [currentProject, setCurrentProject] = useState('')
    const [projectDeleted, setProjectDeleted] = useState(false)
    const [currentPoms, setCurrentPoms] = useState([])
    const [showPoms, setShowPoms] = useState(true)
    const [editProject, setEditProject] = useState(false)
    let pomList

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/projects/${id}`)
        .then(response => {
            if (response.status === 200) {
                setCurrentProject(response.data)
                setCurrentPoms(response.data.poms)
            }
        })
        .catch(err => console.log(err))
    }, [id, currentPoms])

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
        pomList = currentPoms.length < 1 ?
            <p>No Poms</p>
        :
            currentPoms.map((pom, i) => {
                return <Pom key={i} {...pom} currentPoms={currentPoms} setCurrentPoms={setCurrentPoms} editProject={editProject} />
            })
    }

    const toggleAdd = () => {
        setShowPoms(false)
    }

    const toggleEdit = () => {
        setEditProject(!editProject)
    }

    if (projectDeleted) {
        return <Redirect to={`/profile`} />
    }

    return (
        <div>
            {showPoms ?
                    editProject ? 
                        <div>
                            <h1>{currentProject.title}</h1>
                            <p onClick={toggleEdit}>SAVE</p>
                            <button onClick={deleteProject}>Delete</button>
                            <p>{currentProject.description}</p>
                            <button onClick={toggleAdd}>Add Pom</button>
                            {pomList}
                        </div>
                    :
                        <div>
                            <h1>{currentProject.title}</h1>
                            <p onClick={toggleEdit}>EDIT</p>
                            <p>{currentProject.description}</p>
                            <button onClick={toggleAdd}>Add Pom</button>
                            {pomList}
                        </div>
            :
                <Timer id={id} setShowPoms={setShowPoms} currentProject={currentProject} currentPoms={currentPoms} setCurrentPoms={setCurrentPoms} />
            }
        </div>
    )
}