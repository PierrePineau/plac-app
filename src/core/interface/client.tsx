interface Client {
  id: number;
  uuid: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  // adresses: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: boolean;
  deletedAt?: Date;
}
