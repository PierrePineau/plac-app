interface Project {
  id: number;
  uuid: string;
  reference: string;
  name: string;
  description: string;
  notes: Note[];
  organisaton: Organisation;
  files: ProjectFile[];
  medias: Media[];
  status: Status;
  createAt: Date;
  updateAt: Date;
  localisation: string;
}
