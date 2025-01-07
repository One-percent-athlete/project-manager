"use client"

import axios from "axios"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from 'react'

const ProjectItem = () => {
    const [project, setProject] = useState<null>(null)
    const { slug } = useParams()

    useEffect(() => {
        const fetchProject = async () => {
            const { data } = await axios.get(`/api/projects/${slug}`)
        }

        fetchProject()
    }, [slug])
  return (
    <div>ProjectItem</div>
  )
}

export default ProjectItem