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
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
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
    }, [id])

    const deleteProject = (e) => {
        e.preventDefault()
        axios.delete(`${process.env.REACT_APP_API}/projects/${id}`)
        .then(response => {
            if (response.status === 200) {
                let newProjects = projects.filter(project => project._id !== currentProject._id)
                setProjects(newProjects)
            }
            setProjectDeleted(true)
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

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedProject = {
            title: !title ? currentProject.title : title,
            description: !description ? currentProject.description : description
        }
        axios.put(`${process.env.REACT_APP_API}/projects/${id}`, updatedProject)
        .then(response => {
            projects.forEach(project => {
                if (project._id === response.data._id) {
                    project.title = response.data.title
                    project.description = response.data.description
                }
            })
            setProjects(projects)
            toggleEdit()
        })
        .catch(err => {
            console.log(err)
        })
    }

    if (projectDeleted) {
        return <Redirect to={`/profile`} />
    }

    return (
        <>
            {showPoms ?
                    editProject ? 
                        <div className='projectContainer'>
                            <form className='projectForm'>
                                <input className='titleInput' type='text' placeholder={currentProject.title} onChange={handleTitle} />
                                <button onClick={handleSubmit}>save</button>
                                <button onClick={deleteProject}>Delete Project</button>
                                <input className='descriptionInput' type='text' placeholder={currentProject.description} onChange={handleDescription}/>
                            </form>
                            {pomList}
                        </div>
                    :
                        <div className='projectContainer'>
                            <h1 className='projectTitle'>{currentProject.title}</h1>
                            <button onClick={toggleEdit}>edit</button>
                            <p>{currentProject.description}</p>
                            <button onClick={toggleAdd}>Add Pom</button>
                            {pomList}
                        </div>
            :
                <Timer id={id} setShowPoms={setShowPoms} currentProject={currentProject} currentPoms={currentPoms} setCurrentPoms={setCurrentPoms} />
            }
        </>
    )
}