interface Status {
  id: number;
  organisation?: Organisation;
  name: string;
  code: string;
  type: string;
  for: number;
  color: string;
  action: string;
  deleted?: boolean;
  deletedAt?: string;
}
