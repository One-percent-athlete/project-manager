"use client"

import Modal from "@/components/Modal/Modal";
import ProjectForm from "@/components/ProjectForm/ProjectForm";
import ProjectTable from "@/components/ProjectTable/ProjectTable";
import { Project } from "@/models/projects";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {

  interface FormData {
    name: string, 
    description: string, 
    id?:string
  }

  const [ projects, setProjects ] = useState<null | Project[]>(null)
  const [ showForm, setShowForm ] = useState(false)
  const [ isCreateProject, setIsCreateProject ] = useState(false)
  const [ isEditProject, setIsEditProject ] = useState(false)
  const [ formData, setFormData ] = useState<FormData>({name: "", description: "", id: ""})

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await axios.get("/api/projects")
      setProjects(data)
    }

    fetchProjects()
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isEditProject) {
      return handleUpdate()
    }

    setIsCreateProject(true)

    const slug = slugify(formData.name)

    try {
      const { statusText } = await axios.post("/api/projects", {
        name: formData.name,
        description: formData.description,
        slug
      })

      toast.success(statusText)
    } catch (error: any) {
      toast.error(error.response.data)
    } finally {
      setFormData({ name: "", description: ""})
      setShowForm(false)
      setIsCreateProject(false)
    }
  }

  const handleUpdate = async () => {
    const slug = slugify(formData.name)

    try {
      const { statusText } = await axios.patch("/api/projects", {
        id: formData.id,
        name: formData.name,
        description: formData.description,
        slug
      })

      toast.success(statusText)
    } catch (error: any) {
      toast.error(error.response.data)
    }
  }

  const toggleProjectForm = () => setShowForm(prevState => !prevState)

  return (
    <>
      <Modal isVisible={showForm} />
      <ProjectForm formData={formData} isVisible={showForm} toggleProjectForm={toggleProjectForm} handleSubmit={handleSubmit} isCreateProject={isCreateProject} onChange={handleInputChange} />
      <button onClick={() => {
        setFormData({name: "", description: ""})
        toggleProjectForm()
      }} className="relative outline-none inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:first-line:ring-opacity-45">
          Create Project
        </span>
      </button>
      { projects && <ProjectTable projects={projects}/> }
    </>
  );
}
function slugify(name: string) {
  throw new Error("Function not implemented.");
}

