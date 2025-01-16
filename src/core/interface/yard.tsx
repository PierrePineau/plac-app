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

interface Media {
  id: number;
  type: number;
  type_reference: string;
  alt: number;
  meta: any[] | null;
}

interface MediaType {
  id: number;
  reference: string;
  name: string;
  color: string;
}
