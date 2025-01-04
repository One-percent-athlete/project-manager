"use client"

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
    <>{ projects && <ProjectTable projects={projects}/> }</>
  );
}
