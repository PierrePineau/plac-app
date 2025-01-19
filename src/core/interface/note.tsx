interface Note {
  id: number;
  uuid: string;
  name?: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
  projects: Project[];
}
