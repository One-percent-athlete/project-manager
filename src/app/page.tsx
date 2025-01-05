"use client"

import Modal from "@/components/Modal/Modal";
import ProjectForm from "@/components/ProjectForm/ProjectForm";
import ProjectTable from "@/components/ProjectTable/ProjectTable";
import { Project } from "@/models/projects";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

  interface FormData {
    name: string, 
    description: string, 
    id?:string
  }

  const [ projects, setProjects ] = useState<null | Project[]>(null)
  const [ showForm, setShowForm ] = useState(false)
  const [ formData, setFormData ] = useState<FormData>({name: "", description: "", id: ""})

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await axios.get("/api/projects")
      setProjects(data)
    }

    fetchProjects()
  }, [])
  
  return (
    <>
      <Modal isVisible={showForm} />
      <ProjectForm formData={formData} isVisible={showForm} toggleProjectForm={() => {}} handleSubmit={} />
      <button className="relative outline-none inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:first-line:ring-opacity-45">
          Create Project
        </span>
      </button>
      { projects && <ProjectTable projects={projects}/> }
    </>
  );
}
