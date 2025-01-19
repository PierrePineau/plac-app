import { mockFiles } from "./filtre";
import { mockNotes } from "./note";

export const mockProjects: Project[] = [
  {
    id: 1,
    uuid: "123e4567-e89b-12d3-a456-426614174001",
    reference: "PRJ-001",
    name: "Project One",
    notes: [mockNotes[0], mockNotes[1]],
    files: [mockFiles[0], mockFiles[1]]
  },
  {
    id: 2,
    uuid: "123e4567-e89b-12d3-a456-426614174002",
    reference: "PRJ-002",
    name: "Project Two",
    notes: [mockNotes[2]],
    files: [mockFiles[2]]
  },
  {
    id: 3,
    uuid: "123e4567-e89b-12d3-a456-426614174003",
    reference: "PRJ-003",
    name: "Project Three",
    notes: [],
    files: []
  }
];
