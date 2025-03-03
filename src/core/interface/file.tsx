interface ProjectFile {
  id: number;
  media?: Files;
  project?: Project;
  position: number;
}

interface Files {
  id: number;
  uuid: string;
  name: string;
  url?: string;
  type: string;
  ext: string;
  size: number;
  meta?: Record<string, any>;
}
