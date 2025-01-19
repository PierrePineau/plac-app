interface User {
  id: number;
  uuid: string;
  email: string;
  roles: string[];
  password?: string;
  deleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  enable: boolean;
  userOrganisations: Organisation[];
}
