import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Pom({ _id, date, focus, currentPoms, setCurrentPoms }) {
    let { id } = useParams()

    const deletePom = (e) => {
        e.preventDefault()
        axios.delete(`${process.env.REACT_APP_API}/poms/${id}/${_id}`)
        .then(response => {
            if (response.status === 200) {
                currentPoms.filter(pom => pom._id !== _id)
                setCurrentPoms(currentPoms)
            }
        })
    }

    return (
        <div>
            <p>{`${date} - ${focus}`}</p>
            <button onClick={deletePom}>Delete POM</button>
        </div>
    )
}