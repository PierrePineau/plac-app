interface Note {
  id: number;
  uuid: string;
  organisations?: Organisation[];
  name?: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
  deleted?: boolean;
  deletedAt?: Date;
  project: Project;
}
