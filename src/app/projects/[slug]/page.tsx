"use client"

import { Project } from "@/models/projects"
import axios from "axios"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from 'react'

const ProjectItem = () => {
    const [project, setProject] = useState<null | Project>(null)
    const { slug } = useParams()

    useEffect(() => {
        const fetchProject = async () => {
            const { data } = await axios.get(`/api/projects/${slug}`)
        }

        fetchProject()
    }, [slug])

    if (!project) return<></>
  return 
  <>
    <div className="mb-6">
        <h4 className="text-2xl font-bold">{project?.name}</h4> 
        <p className="text-base text-gray-600">{project?.description}</p> 
    </div>
  </>
}

export default ProjectItem