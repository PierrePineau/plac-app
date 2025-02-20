interface Status {
  id: number;
  organisation?: Organisation;
  name: string;
  reference: string;
  type: string;
  for: number;
  color: string;
  deleted?: boolean;
  deletedAt?: string;
}
