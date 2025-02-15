interface ProjectFile {
  id: number;
  url?: string;
  name?: string;
  type?: string;
  meta?: Record<string, any>;
  ext?: string;
  size?: number;
  createdAt: Date;
  viewedAt?: Date;
  updatedAt: Date;
  organisations: Organisation[];
  projects: Project[];
}
