interface Project {
  id: number;
  uuid: string;
  reference: string;
  name?: string;
  notes: Note[];
  files: ProjectFile[];
}
