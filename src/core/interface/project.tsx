interface Project {
  id: string | number;
  reference?: string;
  name: string;
  description: string;
  addresses?: Address[];
  deleted?: boolean;
  clients?: Client[];
  files?: ProjectFile[];
  status?: Status;
  createAt?: Date;
  updateAt?: Date;
  startAt?: Date;
  endAt?: Date;
  tasks?: Task[];
  notes?: Note[];
  organisation?: Organisation;
  thumbnail?: Files;
}
