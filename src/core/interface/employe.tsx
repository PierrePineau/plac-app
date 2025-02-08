interface Employe {
  id: number;
  uuid: string;
  avatar?: string | undefined;
  email?: string;
  telephone: string;
  username: string;
  firstname?: string;
  lastname?: string;
  roles: string[];
  organisations: Organisation[];
  endOfSheets: EndOfSheet[];
}
