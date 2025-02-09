interface Client {
  id: number;
  email?: string;
  avatar: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
  deleted: boolean;
  notes: Note[];
  yards: Project[];
  organisationClients: Organisation[];
}
