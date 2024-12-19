type Yard = {
  id: number;
  reference: string;
  code: number;
  name: string;
  description: string;
  address: string;
  archived: boolean;
  deleted: boolean;
  client: string; //a terme sera relier avec l'interface client
  medias: string; // relier à la table media
  files: string; //relier à la table files
};
