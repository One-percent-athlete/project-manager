export type Project = {
    id: string
    name: string
    description: string
    slug: string
    createdAt: Date
    updatedAt: Date
    projectBoards: ProjectBoard[]
} 

export type ProjectBoard = {
    id: string
    createdAt: Date
    updatedAt: Date
    status: string
    order: number
    slug: string
    projectId: string
    feature: Feature[]
}

export interface Feature {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    slug: string
    description: string
    priority: "LOW" | "MEDIUM" | "HIGH"
    finishDate: Date
    order: number
    projectBoardId: string
}