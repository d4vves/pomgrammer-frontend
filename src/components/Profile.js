import React, { useRef, useEffect } from 'react'
import { select, forceSimulation, forceCenter, forceCollide } from 'd3'

export default function Profile({ projects }) {
    const svgRef = useRef()
    const width = 975
    const height = 575

    useEffect(() => {
        const simulation = forceSimulation(projects)
            .force('center', forceCenter(width / 2, height / 2))
            .force('collide', forceCollide().radius(function(d) {
                return d.poms.length * 5 + 25
            }))
            .on('tick', ticked)
        
        function ticked() {
            const svg = select(svgRef.current)
                    .attr('width', width)
                    .attr('height', height)

            svg
                .selectAll('circle')
                .data(projects)
                .join('circle')
                .attr('r', project => 25 + (project.poms.length * 5))
                .attr('fill', ' #DF5555')
                .attr('stroke', '#6D0606')
                .attr('cx', function(d) {
                    return d.x
                })
                .attr('cy', function(d) {
                    return d.y
                })

            svg
                .selectAll('text')
                .data(projects)
                .join('text')
                .attr('x', function(d) {
                    return d.x
                })
                .attr('y', function(d) {
                    return d.y
                })
                .attr('text-anchor', 'middle')
                .text(project => project.title)
            }
    }, [projects])

    return (
        <div className='profileChart'>
            <svg ref={svgRef}></svg>
        </div>
    )
}