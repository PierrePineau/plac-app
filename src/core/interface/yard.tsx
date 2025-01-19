interface Yard {
  id: number;
  reference: string;
  code: number;
  name: string;
  description: string;
  address: string;
  archived: boolean;
  deleted: boolean;
  client: string;
  medias: string[] | null;
  files: string[] | null;
  notes: Note[];
}
