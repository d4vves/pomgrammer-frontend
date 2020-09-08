import React, { useRef, useEffect } from 'react'
import { select } from 'd3'

export default function Profile({ user, projects }) {
    const svgRef = useRef()

    useEffect(() => {
        const svg = select(svgRef.current)
        .attr('class', 'profileSvg')

        

        

    }, [projects])

    return (
        <div className='profileChart'>
            <svg ref={svgRef}></svg>
        </div>
    )
}