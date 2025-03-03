interface Client {
  id: number;
  uuid: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  // adresses: string;
  deleted?: boolean;
  deletedAt?: Date;
}
