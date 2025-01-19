interface Client {
  id: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
  deleted: boolean;
  organisationClients: Organisation[];
}
