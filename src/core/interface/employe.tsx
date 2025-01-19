interface Employe {
  id: number;
  uuid: string;
  email?: string;
  username: string;
  firstname?: string;
  lastname?: string;
  roles: string[];
  organisations: Organisation[];
}
