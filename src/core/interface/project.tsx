interface Project {
  id?: string | number;
  uuid?: string;
  reference?: string;
  name: string;
  description: string;
  addresses?: Address;
  deleted?: boolean;
  clients?: Client[];
  files?: ProjectFile[];
  status?: Status;
  createAt?: Date;
  updateAt?: Date;
  tasks?: Task[];
  notes?: Note[];
  organisation?: Organisation;
}
