interface Organisation {
  id: number;
  uuid: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  employes: Employe[];
  organisationModules: Module[];
}
