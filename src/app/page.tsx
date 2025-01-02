"use client"

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

  const [ projects, setProjects ] = useState<null | []>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await axios.get("/api/projects")
      console.log(data);
      setProjects(data)
    }

    fetchProjects()
  }, [])
  return (
    <>Home</>
  );
}
