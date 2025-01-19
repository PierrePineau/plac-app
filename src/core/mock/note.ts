import { mockProjects } from "./project";

export const mockNotes: Note[] = [
  {
    id: 1,
    uuid: "123e4567-e89b-12d3-a456-426614174001",
    name: "Note One",
    content: "This is the content of Note One.",
    createdAt: new Date("2025-01-01T10:00:00Z"),
    updatedAt: new Date("2025-01-02T15:30:00Z"),
    projects: [mockProjects[0]]
  },
  {
    id: 2,
    uuid: "123e4567-e89b-12d3-a456-426614174002",
    name: "Note Two",
    content: "This is the content of Note Two.",
    createdAt: new Date("2025-02-01T10:00:00Z"),
    updatedAt: new Date("2025-02-02T15:30:00Z"),
    projects: [mockProjects[1]]
  },
  {
    id: 3,
    uuid: "123e4567-e89b-12d3-a456-426614174003",
    name: "Note Three",
    content: "This is the content of Note Three.",
    createdAt: new Date("2025-03-01T10:00:00Z"),
    updatedAt: new Date("2025-03-02T15:30:00Z"),
    projects: [mockProjects[2]]
  }
];
