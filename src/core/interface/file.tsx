interface ProjectFile {
  id: number;
  media?: Media;
  project?: Project;
  position: number;
}

interface Files {
  id: number;
  uuid: string;
  name?: string;
  url?: string;
  type?: string;
  ext?: string;
  meta?: Record<string, any>;
}
