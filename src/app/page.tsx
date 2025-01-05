"use client"

import Modal from "@/components/Modal/Modal";
import ProjectTable from "@/components/ProjectTable/ProjectTable";
import { Project } from "@/models/projects";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

  const [ projects, setProjects ] = useState<null | Project[]>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await axios.get("/api/projects")
      setProjects(data)
    }

    fetchProjects()
  }, [])
  return (
    <>
      <Modal isVisible />
      <button className="relative outline-none inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:first-line:ring-opacity-45">
          Create Project
        </span>
      </button>
      { projects && <ProjectTable projects={projects}/> }
    </>
  );
}
